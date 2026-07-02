import { deserialize } from '$app/forms';
import { goto, invalidateAll } from '$app/navigation';
import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { clientSideToast } from '$lib/utils/stores';
import {
	type AnalysisStep,
	CONTROL_ANALYSIS_STEPS,
	EVIDENCE_ANALYSIS_STEPS,
	REQUIREMENT_ANALYSIS_STEPS
} from './aiAnalysisProgress';

export type AiAnalysisEntityType = 'requirement' | 'control' | 'evidence';

export interface StartAiAnalysisJobOptions {
	entityType: AiAnalysisEntityType;
	entityId: string;
	entityLabel: string;
	additionalPrompt?: string;
	requirementsCount?: number;
}

export interface AiAnalysisJob {
	entityType: AiAnalysisEntityType;
	entityId: string;
	entityLabel: string;
	pagePath: string;
	actionName: 'runAiAnalysis' | 'runAuditAnalysis';
	steps: AnalysisStep[];
	progressTitle: string;
	additionalPrompt?: string;
	status: 'running' | 'complete' | 'error';
	showProgressModal: boolean;
	openReportOnPage: boolean;
	analysisStep: number;
	analysisPercent: number;
	analysisComplete: boolean;
	pendingResult: Record<string, unknown> | null;
	error: string | null;
}

export const activeAiAnalysisJob = writable<AiAnalysisJob | null>(null);

let progressTimer: ReturnType<typeof setInterval> | null = null;

export function getAnalysisPagePath(entityType: AiAnalysisEntityType, entityId: string): string {
	switch (entityType) {
		case 'requirement':
			return `/requirement-assessments/${entityId}/edit`;
		case 'control':
			return `/applied-controls/${entityId}`;
		case 'evidence':
			return `/evidences/${entityId}`;
	}
}

export function getGoToPageLabel(entityType: AiAnalysisEntityType): string {
	switch (entityType) {
		case 'requirement':
			return 'Go to Requirement Page';
		case 'control':
			return 'Go to Control Page';
		case 'evidence':
			return 'Go to Evidence Page';
	}
}

export function isOnAnalysisPage(pathname: string, job: AiAnalysisJob): boolean {
	const normalized = pathname.replace(/\/$/, '');
	const target = job.pagePath.replace(/\/$/, '');
	return normalized === target || normalized.startsWith(`${target}/`);
}

function patchJob(patch: Partial<AiAnalysisJob>) {
	activeAiAnalysisJob.update((job) => (job ? { ...job, ...patch } : job));
}

function clearProgressTimer() {
	if (progressTimer) {
		clearInterval(progressTimer);
		progressTimer = null;
	}
}

function startProgressTimer() {
	clearProgressTimer();
	patchJob({
		showProgressModal: true,
		analysisStep: 0,
		analysisPercent: 0,
		analysisComplete: false,
		openReportOnPage: false,
		error: null,
		pendingResult: null
	});

	progressTimer = setInterval(() => {
		const job = get(activeAiAnalysisJob);
		if (!job || job.status !== 'running' || job.analysisComplete) return;

		let { analysisPercent, analysisStep } = job;
		if (analysisPercent < 30 && analysisStep === 0) {
			analysisPercent += 2;
		} else if (analysisPercent >= 30 && analysisStep < 1) {
			analysisStep = 1;
			analysisPercent += 1;
		} else if (analysisPercent >= 60 && analysisStep < 2) {
			analysisStep = 2;
			analysisPercent += 0.5;
		} else if (analysisPercent < 90) {
			analysisPercent += 0.3;
		}
		if (analysisPercent > 90) analysisPercent = 90;

		patchJob({ analysisPercent, analysisStep });
	}, 500);
}

function stopProgressTimer(success: boolean) {
	clearProgressTimer();
	if (success) {
		patchJob({ analysisStep: 3, analysisPercent: 100, analysisComplete: true });
	} else {
		patchJob({ showProgressModal: false, analysisComplete: false });
	}
}

function parseSuccessResult(
	entityType: AiAnalysisEntityType,
	resultData: Record<string, unknown>,
	requirementsCount = 0
): Record<string, unknown> {
	if (entityType === 'requirement') {
		const aiData = resultData;
		const aiAnalysis = aiData.ai_analysis as Record<string, unknown> | undefined;
		const overall = aiAnalysis?.overallAssessment as Record<string, unknown> | undefined;
		return {
			id: aiData.analysis_id,
			created_at: new Date().toISOString(),
			status: 'completed',
			score: aiData.score ?? overall?.score ?? null,
			compliance_status:
				aiData.compliance_status ?? aiData.proposed_result ?? overall?.status ?? '',
			gemini_files_count: aiData.gemini_files_count || 0,
			requirements_count: 1,
			result: aiData.ai_analysis,
			question_answers: aiData.question_answers,
			proposed_answers: aiData.proposed_answers,
			proposed_observation: aiData.proposed_observation,
			proposed_result: aiData.proposed_result,
			proposed_status: aiData.proposed_status,
			_raw: aiData
		};
	}

	const aiData = resultData;
	const analysisPayload = ((aiData.ai_analysis as Record<string, unknown>) ?? aiData) as Record<
		string,
		unknown
	>;
	const overall = analysisPayload.overallAssessment as Record<string, unknown> | undefined;
	return {
		id: aiData.ai_analysis_id,
		created_at: aiData.ai_analysis_updated_at || new Date().toISOString(),
		status: 'completed',
		score: overall?.score ?? analysisPayload.score ?? null,
		compliance_status: overall?.status ?? analysisPayload.compliance_status ?? '',
		result: analysisPayload,
		gemini_files_count: aiData.gemini_files_count ?? 1,
		requirements_count: aiData.requirements_count ?? requirementsCount
	};
}

function buildJobConfig(options: StartAiAnalysisJobOptions): Omit<
	AiAnalysisJob,
	| 'status'
	| 'showProgressModal'
	| 'openReportOnPage'
	| 'analysisStep'
	| 'analysisPercent'
	| 'analysisComplete'
	| 'pendingResult'
	| 'error'
> {
	const pagePath = getAnalysisPagePath(options.entityType, options.entityId);
	switch (options.entityType) {
		case 'requirement':
			return {
				entityType: 'requirement',
				entityId: options.entityId,
				entityLabel: options.entityLabel,
				pagePath,
				actionName: 'runAiAnalysis',
				steps: REQUIREMENT_ANALYSIS_STEPS,
				progressTitle: 'Requirement AI Analysis',
				additionalPrompt: options.additionalPrompt
			};
		case 'control':
			return {
				entityType: 'control',
				entityId: options.entityId,
				entityLabel: options.entityLabel,
				pagePath,
				actionName: 'runAiAnalysis',
				steps: CONTROL_ANALYSIS_STEPS,
				progressTitle: 'Control AI Analysis',
				additionalPrompt: options.additionalPrompt
			};
		case 'evidence':
			return {
				entityType: 'evidence',
				entityId: options.entityId,
				entityLabel: options.entityLabel,
				pagePath,
				actionName: 'runAuditAnalysis',
				steps: EVIDENCE_ANALYSIS_STEPS,
				progressTitle: 'Evidence AI Analysis',
				additionalPrompt: options.additionalPrompt
			};
	}
}

export function isJobActiveForEntity(entityId: string): boolean {
	const job = get(activeAiAnalysisJob);
	return !!job && job.entityId === entityId && job.status === 'running';
}

export function startAiAnalysisJob(options: StartAiAnalysisJobOptions) {
	const config = buildJobConfig(options);
	const job: AiAnalysisJob = {
		...config,
		status: 'running',
		showProgressModal: true,
		openReportOnPage: false,
		analysisStep: 0,
		analysisPercent: 0,
		analysisComplete: false,
		pendingResult: null,
		error: null
	};

	activeAiAnalysisJob.set(job);
	startProgressTimer();
	void runAnalysisFetch(job, options.requirementsCount ?? 0);
}

async function runAnalysisFetch(job: AiAnalysisJob, requirementsCount: number) {
	const formData = new FormData();
	if (job.additionalPrompt?.trim()) {
		formData.append('additionalPrompt', job.additionalPrompt.trim());
	}

	const actionUrl = `${job.pagePath}?/${job.actionName}`;

	try {
		const response = await fetch(actionUrl, { method: 'POST', body: formData });
		const text = await response.text();

		let result: {
			type: string;
			data?: Record<string, unknown>;
			error?: { message?: string };
		};

		try {
			result = deserialize(text);
		} catch {
			stopProgressTimer(false);
			patchJob({
				status: 'error',
				error: 'Server returned an unexpected response. The backend may be unreachable.'
			});
			notifyError(job);
			return;
		}

		const errorKey =
			job.actionName === 'runAuditAnalysis'
				? 'auditError'
				: job.entityType === 'requirement'
					? 'aiError'
					: 'aiError';

		if (result.type === 'success' && result.data?.aiAnalysis) {
			const pendingResult = parseSuccessResult(
				job.entityType,
				result.data.aiAnalysis as Record<string, unknown>,
				requirementsCount
			);
			stopProgressTimer(true);
			patchJob({ status: 'complete', pendingResult });
			await invalidateAll();
			notifyComplete(get(activeAiAnalysisJob)!);
			return;
		}

		if (result.type === 'failure' && result.data?.[errorKey]) {
			stopProgressTimer(false);
			patchJob({
				status: 'error',
				error: String(result.data[errorKey])
			});
			notifyError(get(activeAiAnalysisJob)!);
			return;
		}

		if (result.data?.[errorKey]) {
			stopProgressTimer(false);
			patchJob({
				status: 'error',
				error: String(result.data[errorKey])
			});
			notifyError(get(activeAiAnalysisJob)!);
			return;
		}

		stopProgressTimer(false);
		patchJob({ status: 'error', error: 'Unexpected response from server' });
		notifyError(get(activeAiAnalysisJob)!);
	} catch (err) {
		stopProgressTimer(false);
		patchJob({
			status: 'error',
			error:
				err instanceof Error && err.message.includes('Failed to fetch')
					? 'Network error — please check your connection and try again.'
					: `Request failed: ${err instanceof Error ? err.message : String(err)}`
		});
		notifyError(get(activeAiAnalysisJob)!);
	}
}

function notifyComplete(job: AiAnalysisJob) {
	clientSideToast.set({
		type: 'success',
		message: `AI analysis complete for ${job.entityLabel}`
	});
}

function notifyError(job: AiAnalysisJob) {
	clientSideToast.set({
		type: 'error',
		message: job.error || `AI analysis failed for ${job.entityLabel}`
	});
}

export function dismissProgressModal() {
	patchJob({ showProgressModal: false });
}

export function showProgressModalAgain() {
	const job = get(activeAiAnalysisJob);
	if (!job) return;
	patchJob({ showProgressModal: true });
}

export function requestViewResults() {
	const job = get(activeAiAnalysisJob);
	if (!job?.pendingResult) return;

	patchJob({ showProgressModal: false, openReportOnPage: true });

	if (browser && !isOnAnalysisPage(window.location.pathname, job)) {
		void goto(job.pagePath);
	}
}

export function acknowledgeReportOpened() {
	patchJob({ openReportOnPage: false });
}

export function navigateToAnalysisPage() {
	const job = get(activeAiAnalysisJob);
	if (!job || !browser) return;
	if (!isOnAnalysisPage(window.location.pathname, job)) {
		void goto(job.pagePath);
	}
}

export function clearAiAnalysisJob() {
	clearProgressTimer();
	activeAiAnalysisJob.set(null);
}

export function consumeJobError(entityId: string): string | null {
	const job = get(activeAiAnalysisJob);
	if (!job || job.entityId !== entityId || job.status !== 'error' || !job.error) {
		return null;
	}
	const error = job.error;
	clearAiAnalysisJob();
	return error;
}
