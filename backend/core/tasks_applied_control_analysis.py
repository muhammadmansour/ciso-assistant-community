"""
Applied Control AI Analysis using Muraji API + Gemini File Search
"""

import structlog
from huey.contrib.djhuey import task
from django.utils import timezone
import requests
import os

from core.models import AppliedControl, FileSearchTable

logger = structlog.get_logger(__name__)

MURAJI_ANALYSIS_API_URL = os.getenv(
    'MURAJI_ANALYSIS_API_URL', 
    'https://muraji-api.wathbahs.com/api/applied-control/analyze'
)


@task()
def run_applied_control_analysis(applied_control_id: str):
    """
    Run AI analysis for an Applied Control using Muraji API
    Sends Gemini File Search IDs, questions, and typical evidence
    
    Args:
        applied_control_id: UUID of the AppliedControl
    """
    try:
        applied_control = AppliedControl.objects.get(id=applied_control_id)
        
        logger.info(
            "Starting Applied Control AI analysis",
            applied_control_id=applied_control_id,
            applied_control_name=applied_control.name
        )
        
        # Gather Gemini File Search IDs from associated evidences
        file_search_ids = []
        evidences = applied_control.evidences.all()
        
        for evidence in evidences:
            for revision in evidence.revisions.all():
                try:
                    if hasattr(revision, 'file_search'):
                        fs = revision.file_search
                        if fs.upload_status == FileSearchTable.UploadStatus.COMPLETED:
                            file_search_ids.append({
                                'gemini_file_id': fs.gemini_file_id,
                                'gemini_store_id': fs.gemini_store_id,
                                'evidence_name': evidence.name,
                                'evidence_description': evidence.description or ''
                            })
                except FileSearchTable.DoesNotExist:
                    continue
        
        if not file_search_ids:
            logger.warning(
                "No Gemini File Search IDs found for Applied Control",
                applied_control_id=applied_control_id
            )
            return
        
        # Gather questions and typical evidence from requirement assessments
        questions = []
        typical_evidence = []
        requirements_context = []
        
        for req_assessment in applied_control.requirement_assessments.select_related(
            'requirement', 
            'requirement__framework'
        ).all():
            requirement = req_assessment.requirement
            
            # Add requirement context
            requirements_context.append({
                'ref_id': requirement.ref_id,
                'name': requirement.name,
                'description': requirement.description or '',
                'framework': requirement.framework.name if requirement.framework else '',
                'provider': requirement.framework.provider if requirement.framework else ''
            })
            
            # Extract questions from requirement
            if requirement.questions:
                for q_key, q_data in requirement.questions.items():
                    if isinstance(q_data, dict) and 'text' in q_data:
                        questions.append(q_data['text'])
            
            # Extract typical evidence
            if requirement.typical_evidence:
                typical_evidence.extend(requirement.typical_evidence)
        
        # Prepare request body for Muraji API
        request_body = {
            'applied_control': {
                'id': str(applied_control.id),
                'ref_id': applied_control.ref_id,
                'name': applied_control.name,
                'description': applied_control.description or '',
                'status': applied_control.status,
                'category': applied_control.category,
                'csf_function': applied_control.csf_function
            },
            'gemini_file_search': {
                'file_ids': [fs['gemini_file_id'] for fs in file_search_ids],
                'store_id': file_search_ids[0]['gemini_store_id'] if file_search_ids else '',
                'evidences': file_search_ids
            },
            'requirements': requirements_context,
            'questions': list(set(questions)),  # Remove duplicates
            'typical_evidence': list(set(typical_evidence)),  # Remove duplicates
            'analysis_config': {
                'include_entity_extraction': True,
                'include_compliance_check': True,
                'include_gap_analysis': True,
                'include_recommendations': True
            }
        }
        
        logger.info(
            "Sending analysis request to Muraji API",
            applied_control_id=applied_control_id,
            file_count=len(file_search_ids),
            question_count=len(questions),
            requirement_count=len(requirements_context)
        )
        
        # Send request to Muraji API
        response = requests.post(
            MURAJI_ANALYSIS_API_URL,
            json=request_body,
            headers={'Content-Type': 'application/json'},
            timeout=300  # 5 minute timeout
        )
        
        if not response.ok:
            logger.error(
                "Muraji API request failed",
                applied_control_id=applied_control_id,
                status_code=response.status_code,
                response_text=response.text
            )
            return
        
        result = response.json()
        
        # Store the analysis result
        # You can extend AppliedControl model to have an ai_analysis field
        # For now, we'll log it
        logger.success(
            "Applied Control AI analysis completed",
            applied_control_id=applied_control_id,
            analysis_result=result
        )
        
        # TODO: Store result in AppliedControl.ai_analysis field
        # applied_control.ai_analysis = result
        # applied_control.ai_analysis_updated_at = timezone.now()
        # applied_control.save()
        
        return result
        
    except AppliedControl.DoesNotExist:
        logger.error(
            "Applied Control not found",
            applied_control_id=applied_control_id
        )
    except Exception as e:
        logger.error(
            "Failed to run Applied Control AI analysis",
            applied_control_id=applied_control_id,
            error=str(e)
        )
        raise
