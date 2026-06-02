"""
Applied Control AI Analysis using Muraji API
"""

import structlog
from huey.contrib.djhuey import task
from django.utils import timezone
import requests
import os

from core.models import AppliedControl

logger = structlog.get_logger(__name__)

MURAJI_ANALYSIS_API_URL = os.getenv(
    'MURAJI_ANALYSIS_API_URL',
    'https://muraji-api.wathbah.dev/api/audit/analyze'
)


@task()
def run_applied_control_analysis(applied_control_id: str):
    """
    Run AI analysis for an Applied Control using Muraji API.
    Sends evidence info, requirements, questions, and typical evidence.
    
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
        
        # Gather evidence info + durable File Search Store document references.
        evidence_data = []
        gemini_documents = []
        evidences = applied_control.evidences.all()

        for evidence in evidences:
            ev_info = {
                'name': evidence.name,
                'description': evidence.description or '',
            }

            for revision in evidence.revisions.all():
                try:
                    fs = getattr(revision, 'file_search', None)
                    if fs and fs.has_durable_document():
                        gemini_documents.append({
                            'gemini_document_id': fs.gemini_document_id,
                            'gemini_store_id': fs.gemini_store_id,
                            'evidence_name': evidence.name,
                            # Stable upload identifiers tagged on the indexed
                            # document at upload time (see tasks_gemini.
                            # _build_evidence_custom_metadata). Muraji uses
                            # evidence_revision_id to build a metadataFilter
                            # so retrieval is restricted to these documents.
                            'evidence_revision_id': str(revision.id),
                            'evidence_id': str(evidence.id),
                        })
                except Exception:
                    # FileSearchTable may not exist yet - skip gracefully
                    pass

            evidence_data.append(ev_info)
        
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
            
            # Extract questions from requirement (skip excluded ones)
            if requirement.questions:
                for q_key, q_data in requirement.questions.items():
                    if isinstance(q_data, dict):
                        if q_data.get('excluded') is True:
                            continue
                        if 'text' in q_data:
                            questions.append(q_data['text'])
            
            # Extract typical evidence (skip lines marked [EXCLUDED])
            if requirement.typical_evidence:
                if isinstance(requirement.typical_evidence, str):
                    for line in requirement.typical_evidence.strip().split('\n'):
                        if '[EXCLUDED]' in line:
                            continue
                        line = line.strip().lstrip('-').lstrip('•').strip()
                        if line:
                            typical_evidence.append(line)
                elif isinstance(requirement.typical_evidence, list):
                    for item in requirement.typical_evidence:
                        if isinstance(item, str) and '[EXCLUDED]' in item:
                            continue
                        typical_evidence.append(item)
        
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
            'evidences': evidence_data,
            'gemini_file_search': {
                'document_ids': [d['gemini_document_id'] for d in gemini_documents],
                'evidences': gemini_documents,
            } if gemini_documents else None,
            'requirements': requirements_context,
            'questions': list(set(questions)),
            'typical_evidence': list(set(typical_evidence)),
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
            muraji_url=MURAJI_ANALYSIS_API_URL,
            evidence_count=len(evidence_data),
            gemini_document_count=len(gemini_documents),
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
        
        logger.info(
            "Applied Control AI analysis completed",
            applied_control_id=applied_control_id,
            result_keys=list(result.keys()) if isinstance(result, dict) else None
        )
        
        # Store result in Django cache (no migration needed)
        from django.core.cache import cache
        cache_key = f"ai_analysis_{applied_control.id}"
        cache.set(cache_key, {
            'result': result,
            'updated_at': timezone.now().isoformat(),
        }, timeout=86400 * 30)  # Cache for 30 days
        
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
