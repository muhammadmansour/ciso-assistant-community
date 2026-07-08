"""
Reusable helper functions for parsing AI analysis results from Muraji API.

These are extracted from RequirementAssessmentViewSet.run_ai_analysis so they can
be reused by the apply-ai-analysis preview endpoint and elsewhere.
"""

from django.utils import timezone as tz


# ── Compliance result mapping ──
RESULT_MAPPING = {
    'compliant': 'compliant',
    'partially_compliant': 'partially_compliant',
    'partial': 'partially_compliant',
    'partially compliant': 'partially_compliant',
    'non_compliant': 'non_compliant',
    'non-compliant': 'non_compliant',
    'noncompliant': 'non_compliant',
    'not compliant': 'non_compliant',
    'not met': 'non_compliant',
    'not_applicable': 'not_applicable',
    'not applicable': 'not_applicable',
    'na': 'not_applicable',
    'n/a': 'not_applicable',
}

VALID_ANSWERS = {'yes': 'Yes', 'no': 'No', 'partial': 'Partial'}


def normalize_answer(raw_answer):
    """Normalize an answer string to exactly Yes, No, or Partial."""
    if raw_answer is None:
        return 'No'  # No answer provided = no evidence of compliance
    val = str(raw_answer).strip().lower()
    if val in VALID_ANSWERS:
        return VALID_ANSWERS[val]
    # Try common variations
    if val in ('true', 'compliant', 'met', 'full', 'fully'):
        return 'Yes'
    if val in ('false', 'non-compliant', 'noncompliant', 'not met', 'none', 'not_met',
               'not found', 'not provided', 'missing', 'absent', 'غير موجود', 'لا'):
        return 'No'
    if val in ('partially', 'partially compliant', 'partially_compliant', 'partial', 'partly',
               'incomplete', 'in progress', 'in_progress'):
        return 'Partial'
    return 'No'  # Unknown/ambiguous answer = no evidence of compliance (fail-safe)


def extract_question_answers(ai_result, original_questions):
    """Extract question answers from the AI response and return as a separate dict.

    IMPORTANT: Always uses the original requirement questions as the question text,
    not whatever the AI may have rephrased them to. The AI's answers are matched
    to original questions by index order.
    """
    if not isinstance(ai_result, dict):
        return {}

    # Find the question evaluation section (case-insensitive)
    question_section = None
    for key in ai_result:
        lower_key = key.lower().replace('_', '').replace(' ', '')
        if lower_key in ('questionevaluation', 'questionsanswers', 'questionanswers',
                         'questions_answers', 'question_evaluation', 'questionsandanswers'):
            question_section = ai_result[key]
            break

    answers_dict = {}

    if isinstance(question_section, list):
        for idx, item in enumerate(question_section):
            if isinstance(item, dict):
                # ALWAYS use the original requirement question text
                q_text = original_questions[idx] if idx < len(original_questions) else None

                # If we don't have an original question for this index, use AI's text as fallback
                if not q_text:
                    for q_key in ('question', 'text', 'questionText', 'question_text'):
                        if q_key in item:
                            q_text = item[q_key]
                            break

                # Get the answer and normalize
                raw_answer = None
                for a_key in ('answer', 'answered', 'selectedChoice', 'selected_choice', 'value', 'response'):
                    if a_key in item:
                        raw_answer = item[a_key]
                        break

                normalized = normalize_answer(raw_answer)
                q_number = item.get('questionNumber', item.get('number', idx + 1))

                answer_entry = {
                    'question': q_text or f"Question {q_number}",
                    'answer': normalized,
                }
                # Include source/justification if present
                for extra_key in ('source', 'sourceFile', 'appliedControl', 'applied_control'):
                    if extra_key in item and item[extra_key]:
                        answer_entry['source'] = item[extra_key] if isinstance(item[extra_key], str) else str(item[extra_key])
                        break
                for extra_key in ('justification', 'explanation', 'reasoning', 'notes'):
                    if extra_key in item and item[extra_key]:
                        answer_entry['justification'] = str(item[extra_key])
                        break

                answers_dict[f"q{idx + 1}"] = answer_entry

                # Also normalize the answer in-place in the AI response
                for a_key in ('answer', 'answered', 'selectedChoice', 'selected_choice', 'value', 'response'):
                    if a_key in item:
                        item[a_key] = normalized
                        break
                else:
                    item['answer'] = normalized

                # Also replace the question text in the AI response with the original
                if idx < len(original_questions):
                    for q_key in ('question', 'text', 'questionText', 'question_text'):
                        if q_key in item:
                            item[q_key] = original_questions[idx]
                            break

    elif isinstance(question_section, dict):
        # Handle dict format
        for idx, (q_key, q_val) in enumerate(question_section.items()):
            q_text = original_questions[idx] if idx < len(original_questions) else None

            if isinstance(q_val, dict):
                raw_answer = q_val.get('answer', q_val.get('value'))
                normalized = normalize_answer(raw_answer)
                answers_dict[f"q{idx + 1}"] = {
                    'question': q_text or q_val.get('question', q_val.get('text', q_key)),
                    'answer': normalized,
                }
                q_val['answer'] = normalized
                if q_text:
                    if 'question' in q_val:
                        q_val['question'] = q_text
                    elif 'text' in q_val:
                        q_val['text'] = q_text
            elif isinstance(q_val, str):
                normalized = normalize_answer(q_val)
                answers_dict[f"q{idx + 1}"] = {
                    'question': q_text or q_key,
                    'answer': normalized,
                }
                question_section[q_key] = normalized

    # If no question section found, create answers from original questions with Partial
    if not answers_dict and original_questions:
        for idx, q in enumerate(original_questions):
            answers_dict[f"q{idx + 1}"] = {
                'question': q,
                'answer': 'Partial',
            }

    return answers_dict


def _ci_get_str(d, *keys):
    """Case-insensitive dict lookup — returns string values only."""
    if not isinstance(d, dict):
        return None
    lower_map = {k.lower(): k for k in d}
    for key in keys:
        real_key = lower_map.get(key.lower())
        if real_key is not None:
            val = d[real_key]
            if isinstance(val, str) and val.strip():
                return val.strip()
    return None


def _ci_get_any(d, *keys):
    """Case-insensitive dict lookup — returns any value."""
    if not isinstance(d, dict):
        return None
    lower_map = {k.lower(): k for k in d}
    for key in keys:
        real_key = lower_map.get(key.lower())
        if real_key is not None:
            return d[real_key]
    return None


STATUS_KEYS = ('status', 'compliance_status', 'complianceStatus', 'compliancestatus', 'result', 'compliance_result')


def find_compliance_status(ai_result):
    """Search multiple paths in the AI response to find the compliance status.
    Returns a string like 'compliant', 'partially_compliant', etc., or '' if not found.
    """
    if not isinstance(ai_result, dict):
        return ''

    # 1. overallAssessment.status (our requested format)
    for oa_key in ('overallAssessment', 'overall_assessment', 'overallassessment'):
        oa = _ci_get_any(ai_result, oa_key)
        if isinstance(oa, dict):
            val = _ci_get_str(oa, *STATUS_KEYS)
            if val:
                return val

    # 2. Top-level string: compliance_status, complianceStatus, status
    val = _ci_get_str(ai_result, *STATUS_KEYS)
    if val:
        return val

    # 3. results.compliance_status (documented Muraji response format)
    results_block = _ci_get_any(ai_result, 'results')
    if isinstance(results_block, dict):
        cs = _ci_get_any(results_block, 'compliance_status', 'complianceStatus', 'compliancestatus')
        if isinstance(cs, str) and cs.strip():
            return cs.strip()
        if isinstance(cs, dict):
            findings = cs.get('findings', [])
            if isinstance(findings, list) and findings:
                first = findings[0]
                if isinstance(first, dict):
                    s = first.get('status', '')
                    if isinstance(s, str) and s.strip():
                        return s.strip()
            val = _ci_get_str(cs, *STATUS_KEYS)
            if val:
                return val
        val = _ci_get_str(results_block, *STATUS_KEYS)
        if val:
            return val

    # 4. Scan all top-level dict values for a status field
    for k, v in ai_result.items():
        if isinstance(v, dict):
            val = _ci_get_str(v, *STATUS_KEYS)
            if val and val.lower().replace('_', '').replace(' ', '').replace('-', '') in (
                'compliant', 'partiallycompliant', 'noncompliant', 'notapplicable', 'notassessed'
            ):
                return val

    return ''


def derive_compliance_result(ai_result, question_answers):
    """Derive the compliance result enum value from AI analysis data.

    Returns a string like 'compliant', 'partially_compliant', etc., or None.
    """
    compliance_status_val = find_compliance_status(ai_result)

    ai_result_value = RESULT_MAPPING.get(
        compliance_status_val.lower().strip(),
        None
    ) if compliance_status_val else None

    # FALLBACK: derive from question answers if no explicit compliance status
    if not ai_result_value and question_answers:
        answer_values = [
            qa.get('answer', '').lower()
            for qa in question_answers.values()
            if isinstance(qa, dict) and qa.get('answer')
        ]
        if answer_values:
            if all(a == 'yes' for a in answer_values):
                ai_result_value = 'compliant'
            elif all(a == 'no' for a in answer_values):
                ai_result_value = 'non_compliant'
            else:
                ai_result_value = 'partially_compliant'

    return ai_result_value


def build_observation_text(ai_result, existing_observation=''):
    """Build AI observation text from the analysis reasoning / summary.

    Returns the full observation text (with AI header and existing content preserved),
    or the existing observation unchanged if no AI text could be extracted.
    """
    if not isinstance(ai_result, dict):
        return existing_observation or ''

    overall = ai_result.get('overallAssessment', {}) if isinstance(ai_result, dict) else {}
    results_block = ai_result.get('results', {}) if isinstance(ai_result.get('results'), dict) else {}

    ai_observation_parts = []

    summary_text = (
        ai_result.get('summary')
        or (overall.get('summary') if isinstance(overall, dict) else None)
        or (overall.get('reasoning') if isinstance(overall, dict) else None)
        or results_block.get('summary')
    )
    if summary_text:
        ai_observation_parts.append(str(summary_text))

    # Include gap analysis highlights
    gap_analysis = (
        ai_result.get('gapAnalysis')
        or ai_result.get('gap_analysis')
        or results_block.get('gap_analysis')
    )
    if isinstance(gap_analysis, dict):
        gaps = gap_analysis.get('identified_gaps') or gap_analysis.get('gaps', [])
        if isinstance(gaps, list) and gaps:
            gap_lines = []
            for gap in gaps[:5]:
                if isinstance(gap, dict):
                    gap_text = gap.get('gap') or gap.get('description') or gap.get('finding', '')
                    if gap_text:
                        gap_lines.append(f"  - {gap_text}")
                elif isinstance(gap, str):
                    gap_lines.append(f"  - {gap}")
            if gap_lines:
                ai_observation_parts.append("Gaps identified:\n" + "\n".join(gap_lines))

    # Include recommendations
    recs = ai_result.get('recommendations') or results_block.get('recommendations')
    if isinstance(recs, list) and recs:
        rec_lines = []
        for rec in recs[:5]:
            if isinstance(rec, str):
                rec_lines.append(f"  - {rec}")
            elif isinstance(rec, dict):
                rec_text = rec.get('recommendation') or rec.get('text') or rec.get('description', '')
                if rec_text:
                    rec_lines.append(f"  - {rec_text}")
        if rec_lines:
            ai_observation_parts.append("Recommendations:\n" + "\n".join(rec_lines))

    if ai_observation_parts:
        ai_date = tz.now().strftime('%Y-%m-%d %H:%M')
        ai_header = f"[AI Analysis — {ai_date}]"
        ai_text = f"{ai_header}\n" + "\n\n".join(ai_observation_parts)

        if existing_observation and existing_observation.strip():
            return f"{ai_text}\n\n---\n{existing_observation}"
        else:
            return ai_text

    return existing_observation or ''


def map_answers_to_requirement_choices(question_answers, req_questions):
    """Map AI Yes/No/Partial answers to choice URNs in the requirement's questions.

    Returns a dict of { question_urn: choice_urn_or_list } suitable for the RA answers field.
    """
    if not req_questions or not question_answers:
        return {}

    mapped_answers = {}

    # Build ordered list of question URNs matching the order we sent to the AI.
    # Excluded questions are NOT sent to the AI, so we must skip them here too
    # to keep the AI-answer index aligned with the requirement's question URNs.
    question_urns_ordered = []
    for q_urn, q_def in req_questions.items():
        if isinstance(q_def, dict) and 'text' in q_def:
            if q_def.get('excluded') is True:
                continue
            question_urns_ordered.append((q_urn, q_def))

    # Map AI answer index to question URN
    qa_entries = list(question_answers.values())
    for idx, qa_entry in enumerate(qa_entries):
        if idx >= len(question_urns_ordered):
            break

        q_urn, q_def = question_urns_ordered[idx]
        ai_answer = qa_entry.get('answer', '')  # "Yes", "No", or "Partial"
        choices = q_def.get('choices', [])

        if not choices or not ai_answer:
            continue

        # Find the choice whose value matches the AI answer (case-insensitive)
        matched_choice_urn = None
        ai_lower = ai_answer.lower()
        for choice in choices:
            choice_value = (choice.get('value') or '').lower()
            if choice_value == ai_lower:
                matched_choice_urn = choice.get('urn')
                break

        # Fallback: if "Partial" not found, try "N/A" or similar
        if not matched_choice_urn and ai_lower == 'partial':
            for choice in choices:
                choice_value = (choice.get('value') or '').lower()
                if choice_value in ('partial', 'n/a', 'na', 'partially'):
                    matched_choice_urn = choice.get('urn')
                    break

        if matched_choice_urn:
            q_type = q_def.get('type', 'unique_choice')
            if q_type == 'multiple_choice':
                mapped_answers[q_urn] = [matched_choice_urn]
            else:
                mapped_answers[q_urn] = matched_choice_urn

    return mapped_answers


def compute_proposed_status(current_status):
    """Compute the proposed status after AI analysis.

    Only advances forward (to_do -> in_progress -> in_review), never regresses.
    """
    STATUS_ORDER = ['to_do', 'in_progress', 'in_review', 'done']
    old_idx = STATUS_ORDER.index(current_status) if current_status in STATUS_ORDER else -1
    target_idx = STATUS_ORDER.index('in_review')
    if old_idx < target_idx:
        return 'in_review'
    return current_status


def gather_evidence_linked_audit_context(evidence):
    """Collect requirements, questions, and typical evidence from linked RAs."""
    questions = []
    typical_evidence = []
    requirements_context = []

    for ra in evidence.requirement_assessments.select_related(
        'requirement', 'requirement__framework'
    ).all():
        req = ra.requirement
        requirements_context.append({
            'ref_id': req.ref_id,
            'name': req.name,
            'description': req.description or '',
            'framework': req.framework.name if req.framework else '',
            'provider': req.framework.provider if req.framework else '',
        })

        if req.questions:
            if isinstance(req.questions, dict):
                for q_val in req.questions.values():
                    if isinstance(q_val, dict):
                        if q_val.get('excluded') is True:
                            continue
                        if 'text' in q_val:
                            questions.append(q_val['text'])
                    elif isinstance(q_val, str):
                        questions.append(q_val)
            elif isinstance(req.questions, list):
                for q in req.questions:
                    if isinstance(q, dict):
                        if q.get('excluded') is True:
                            continue
                        questions.append(q.get('text', ''))
                    else:
                        questions.append(q)

        if req.typical_evidence:
            if isinstance(req.typical_evidence, str):
                for line in req.typical_evidence.strip().split('\n'):
                    if '[EXCLUDED]' in line:
                        continue
                    line = line.strip().lstrip('-').lstrip('•').strip()
                    if line:
                        typical_evidence.append(line)
            elif isinstance(req.typical_evidence, list):
                for item in req.typical_evidence:
                    if isinstance(item, str) and '[EXCLUDED]' in item:
                        continue
                    typical_evidence.append(item)

    questions = list(dict.fromkeys([q for q in questions if q]))
    typical_evidence = list(dict.fromkeys(typical_evidence))
    return questions, typical_evidence, requirements_context


def collect_evidence_gemini_documents(evidence):
    """Return indexed Gemini File Search document refs for one evidence."""
    from core.models import FileSearchTable

    gemini_documents = []
    for revision in evidence.revisions.all():
        if not revision.attachment:
            continue
        fs_entry = FileSearchTable.objects.filter(evidence_revision=revision).first()
        if fs_entry and fs_entry.has_durable_document():
            gemini_documents.append({
                'gemini_document_id': fs_entry.gemini_document_id,
                'gemini_store_id': fs_entry.gemini_store_id,
                'evidence_name': evidence.name,
                'evidence_description': evidence.description or '',
                'evidence_revision_id': str(revision.id),
                'evidence_id': str(evidence.id),
            })
    return gemini_documents


def build_evidence_muraji_audit_body(evidence):
    """Build Muraji /api/audit/analyze payload for assessment_type=evidence."""
    import os

    questions, typical_evidence, requirements_context = gather_evidence_linked_audit_context(
        evidence
    )
    gemini_documents = collect_evidence_gemini_documents(evidence)

    return {
        'assessment_type': 'evidence',
        'applied_control': {
            'id': str(evidence.id),
            'ref_id': '',
            'name': evidence.name,
            'description': evidence.description or '',
            'status': evidence.status or '',
            'category': 'evidence',
            'csf_function': '',
        },
        'gemini_file_search': {
            'document_ids': [d['gemini_document_id'] for d in gemini_documents],
            'evidences': gemini_documents,
        },
        'requirements': requirements_context,
        'questions': questions,
        'typical_evidence': typical_evidence,
        'analysis_config': {
            'return_compliance_result': True,
            'include_gap_analysis': True,
            'include_typical_evidence_check': True,
            'include_recommendations': True,
            'include_entity_extraction': False,
            'include_compliance_check': False,
            'response_language': 'auto',
            'model': os.environ.get('GEMINI_MODEL', 'gemini-2.5-pro'),
        },
    }, gemini_documents, requirements_context
