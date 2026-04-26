# CISO Wathbah Development Startup Script for Windows
# Usage: .\start-dev.ps1 [-Action start|stop|restart|status]

param(
    [ValidateSet("start", "stop", "restart", "status")]
    [string]$Action = "start"
)

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Join-Path $ProjectDir "backend"
$FrontendDir = Join-Path $ProjectDir "frontend"
$LogDir = Join-Path $ProjectDir "logs"

# Find Poetry
$PoetryCmd = $null
$PoetryPaths = @(
    "poetry",
    "$env:APPDATA\Python\Python311\Scripts\poetry.exe",
    "$env:APPDATA\Python\Python312\Scripts\poetry.exe",
    "$env:LOCALAPPDATA\Programs\Python\Python311\Scripts\poetry.exe",
    "$env:USERPROFILE\.local\bin\poetry.exe"
)
foreach ($path in $PoetryPaths) {
    if (Get-Command $path -ErrorAction SilentlyContinue) {
        $PoetryCmd = $path
        break
    }
    if (Test-Path $path) {
        $PoetryCmd = $path
        break
    }
}
if (-not $PoetryCmd) {
    Write-Host "ERROR: Poetry not found. Install it with: pip install poetry" -ForegroundColor Red
    exit 1
}
Write-Host "Using Poetry: $PoetryCmd" -ForegroundColor Cyan

# Environment variables
$env:DJANGO_DEBUG = "True"
$env:CISO_ASSISTANT_URL = "http://localhost:5173"
$env:ALLOWED_HOSTS = "localhost,127.0.0.1"
$env:PUBLIC_BACKEND_API_URL = "http://localhost:8000/api"
$env:PUBLIC_BACKEND_API_EXPOSED_URL = "http://localhost:5173/api"

# Create log directory
if (-not (Test-Path $LogDir)) {
    New-Item -ItemType Directory -Path $LogDir | Out-Null
}

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Start-Backend {
    Write-ColorOutput Green "Starting backend..."
    
    # Run migrations
    Push-Location $BackendDir
    & $PoetryCmd run python manage.py migrate --noinput
    
    # Start backend
    $poetryPath = $PoetryCmd
    $backendJob = Start-Job -ScriptBlock {
        param($dir, $logDir, $poetry)
        Set-Location $dir
        $env:DJANGO_DEBUG = "True"
        $env:CISO_ASSISTANT_URL = "http://localhost:5173"
        $env:ALLOWED_HOSTS = "localhost,127.0.0.1"
        & $poetry run python manage.py runserver 0.0.0.0:8000 2>&1 | Tee-Object -FilePath "$logDir\backend.log"
    } -ArgumentList $BackendDir, $LogDir, $poetryPath
    
    Pop-Location
    $backendJob.Id | Out-File "$LogDir\backend.jobid"
    Write-ColorOutput Green "Backend started (Job ID: $($backendJob.Id))"
}

function Start-Huey {
    Write-ColorOutput Green "Starting Huey task queue..."
    
    $poetryPath = $PoetryCmd
    $hueyJob = Start-Job -ScriptBlock {
        param($dir, $logDir, $poetry)
        Set-Location $dir
        & $poetry run python manage.py run_huey -w 2 --scheduler-interval 60 2>&1 | Tee-Object -FilePath "$logDir\huey.log"
    } -ArgumentList $BackendDir, $LogDir, $poetryPath
    
    $hueyJob.Id | Out-File "$LogDir\huey.jobid"
    Write-ColorOutput Green "Huey started (Job ID: $($hueyJob.Id))"
}

function Start-Frontend {
    Write-ColorOutput Green "Starting frontend..."
    
    Push-Location $FrontendDir
    
    # Install dependencies if needed
    if (-not (Test-Path "node_modules")) {
        Write-ColorOutput Yellow "Installing frontend dependencies..."
        & pnpm install
    }
    
    $frontendJob = Start-Job -ScriptBlock {
        param($dir, $logDir)
        Set-Location $dir
        $env:PUBLIC_BACKEND_API_URL = "http://localhost:8000/api"
        & pnpm run dev 2>&1 | Tee-Object -FilePath "$logDir\frontend.log"
    } -ArgumentList $FrontendDir, $LogDir
    
    Pop-Location
    $frontendJob.Id | Out-File "$LogDir\frontend.jobid"
    Write-ColorOutput Green "Frontend started (Job ID: $($frontendJob.Id))"
}

function Stop-AllServices {
    Write-ColorOutput Red "Stopping all services..."
    
    # Stop jobs
    @("backend", "huey", "frontend") | ForEach-Object {
        $jobFile = "$LogDir\$_.jobid"
        if (Test-Path $jobFile) {
            $jobId = Get-Content $jobFile
            Stop-Job -Id $jobId -ErrorAction SilentlyContinue
            Remove-Job -Id $jobId -Force -ErrorAction SilentlyContinue
            Remove-Item $jobFile -ErrorAction SilentlyContinue
        }
    }
    
    # Kill processes on ports
    $portsToKill = @(8000, 5173)
    foreach ($port in $portsToKill) {
        $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | 
                   Select-Object -ExpandProperty OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        }
    }
    
    Write-ColorOutput Green "All services stopped"
}

function Get-ServiceStatus {
    Write-Host "========================================"
    Write-Host "  CISO Wathbah Status"
    Write-Host "========================================"
    
    @(
        @{Name="Backend"; Port=8000; JobFile="backend.jobid"},
        @{Name="Huey"; Port=$null; JobFile="huey.jobid"},
        @{Name="Frontend"; Port=5173; JobFile="frontend.jobid"}
    ) | ForEach-Object {
        $jobFile = Join-Path $LogDir $_.JobFile
        $status = "Stopped"
        $color = "Red"
        
        if (Test-Path $jobFile) {
            $jobId = Get-Content $jobFile
            $job = Get-Job -Id $jobId -ErrorAction SilentlyContinue
            if ($job -and $job.State -eq "Running") {
                $status = "Running (Job: $jobId)"
                $color = "Green"
            }
        }
        
        Write-Host "  $($_.Name): " -NoNewline
        Write-ColorOutput $color $status
    }
    Write-Host ""
}

# Main execution
switch ($Action) {
    "start" {
        Write-Host "========================================"
        Write-Host "  Starting CISO Wathbah (Dev Mode)"
        Write-Host "========================================"
        
        Start-Backend
        Start-Sleep -Seconds 5
        Start-Huey
        Start-Frontend
        
        Write-Host ""
        Write-Host "========================================"
        Write-ColorOutput Green "  All services started!"
        Write-Host "========================================"
        Write-Host ""
        Write-Host "  Backend:  http://localhost:8000"
        Write-Host "  Frontend: http://localhost:5173"
        Write-Host "  Logs:     $LogDir"
        Write-Host ""
        Write-Host "  Use '.\start-dev.ps1 -Action status' to check status"
        Write-Host "  Use '.\start-dev.ps1 -Action stop' to stop all services"
        Write-Host ""
    }
    "stop" {
        Stop-AllServices
    }
    "restart" {
        Stop-AllServices
        Start-Sleep -Seconds 2
        & $MyInvocation.MyCommand.Path -Action start
    }
    "status" {
        Get-ServiceStatus
    }
}
