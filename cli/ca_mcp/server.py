"""Main MCP server entry point for CISO Assistant"""

from mcp.server.fastmcp import FastMCP

# Initialize FastMCP server
mcp = FastMCP("ciso-assistant")

# Import all tools to register them with the MCP server
from .tools.read_tools import (
    get_user_activity_logs,
    get_risk_scenarios,
    get_risk_scenario,
    get_applied_controls,
    get_audits_progress,
    get_folders,
    get_perimeters,
    get_risk_matrices,
    get_risk_matrix_details,
    get_risk_assessments,
    get_threats,
    get_assets,
    get_incidents,
    get_security_exceptions,
    get_frameworks,
    get_business_impact_analyses,
    get_requirement_assessments,
    get_quantitative_risk_studies,
    get_quantitative_risk_scenarios,
    get_quantitative_risk_hypotheses,
    get_task_templates,
    get_task_template_details,
    get_vulnerabilities,
    get_vulnerability,
    get_asset_classes,
    get_users,
    get_teams,
)

from .tools.aggregate_tools import count_objects
from .tools.generic_tools import list_objects, get_object

from .tools.analysis_tools import (
    get_all_audits_with_metrics,
    get_audit_gap_analysis,
    get_audit_global_score,
)

from .tools.library_tools import (
    get_stored_libraries,
    get_loaded_libraries,
    import_stored_library,
)

from .tools.write_tools import (
    create_folder,
    create_team,
    create_perimeter,
    create_asset,
    create_threat,
    create_applied_control,
    create_risk_assessment,
    sync_risk_assessment_from_ebios_rm,
    create_risk_scenario,
    create_business_impact_analysis,
    create_compliance_assessment,
    create_quantitative_risk_study,
    create_quantitative_risk_scenario,
    create_quantitative_risk_hypothesis,
    refresh_quantitative_risk_study_simulations,
    create_task_template,
    create_vulnerability,
    create_findings_assessment,
    create_finding,
    create_evidence,
    create_incident,
    create_timeline_entry,
)

from .tools.update_tools import (
    update_team,
    update_folder,
    update_user,
    update_evidence,
    update_asset,
    update_risk_scenario,
    update_applied_control,
    update_risk_assessment,
    update_perimeter,
    update_requirement_assessment,
    update_requirement_assessments,
    update_quantitative_risk_study,
    update_quantitative_risk_scenario,
    update_quantitative_risk_hypothesis,
    update_task_template,
    delete_task_template,
    update_vulnerability,
    delete_vulnerability,
    update_finding,
    update_incident,
    update_timeline_entry,
)

from .tools.tprm_tools import (
    # Read tools
    get_entities,
    get_entity_assessments,
    get_representatives,
    get_solutions,
    get_contracts,
    # Write tools
    create_entity,
    create_entity_assessment,
    create_representative,
    create_solution,
    create_contract,
    # Update tools
    update_entity,
    update_entity_assessment,
    update_representative,
    update_solution,
    update_contract,
)

from .tools.ebios_rm_tools import (
    # Read tools
    get_ebios_rm_studies,
    get_feared_events,
    get_ro_to_couples,
    get_stakeholders,
    get_strategic_scenarios,
    get_attack_paths,
    get_operational_scenarios,
    get_elementary_actions,
    get_operating_modes,
    get_kill_chains,
    # Write tools
    create_ebios_rm_study,
    create_feared_event,
    create_ro_to_couple,
    create_stakeholder,
    create_strategic_scenario,
    create_attack_path,
    create_operational_scenario,
    create_elementary_action,
    create_operating_mode,
    create_kill_chain_step,
    # Update tools
    update_ebios_rm_study,
    update_feared_event,
    update_ro_to_couple,
    update_stakeholder,
    update_strategic_scenario,
    update_attack_path,
    update_operational_scenario,
    update_operating_mode,
    update_kill_chain_step,
)

READ_TOOLS = [
    get_user_activity_logs,
    count_objects,
    list_objects,
    get_object,
    get_risk_scenarios,
    get_risk_scenario,
    get_applied_controls,
    get_audits_progress,
    get_folders,
    get_perimeters,
    get_risk_matrices,
    get_risk_matrix_details,
    get_risk_assessments,
    get_threats,
    get_assets,
    get_incidents,
    get_security_exceptions,
    get_frameworks,
    get_business_impact_analyses,
    get_requirement_assessments,
    get_quantitative_risk_studies,
    get_quantitative_risk_scenarios,
    get_quantitative_risk_hypotheses,
    get_task_templates,
    get_task_template_details,
    get_vulnerabilities,
    get_vulnerability,
    get_asset_classes,
    get_users,
    get_teams,
    get_all_audits_with_metrics,
    get_audit_gap_analysis,
    get_audit_global_score,
    get_stored_libraries,
    get_loaded_libraries,
    get_entities,
    get_entity_assessments,
    get_representatives,
    get_solutions,
    get_contracts,
    get_ebios_rm_studies,
    get_feared_events,
    get_ro_to_couples,
    get_stakeholders,
    get_strategic_scenarios,
    get_attack_paths,
    get_operational_scenarios,
    get_elementary_actions,
    get_operating_modes,
    get_kill_chains,
]

WRITE_TOOLS = [
    import_stored_library,
    create_folder,
    update_folder,
    create_team,
    update_team,
    update_user,
    create_perimeter,
    create_asset,
    create_threat,
    create_applied_control,
    create_risk_assessment,
    sync_risk_assessment_from_ebios_rm,
    create_risk_scenario,
    create_business_impact_analysis,
    create_compliance_assessment,
    create_quantitative_risk_study,
    create_quantitative_risk_scenario,
    create_quantitative_risk_hypothesis,
    refresh_quantitative_risk_study_simulations,
    create_task_template,
    create_vulnerability,
    update_vulnerability,
    delete_vulnerability,
    create_findings_assessment,
    create_finding,
    update_finding,
    create_evidence,
    update_evidence,
    create_incident,
    update_incident,
    create_timeline_entry,
    update_timeline_entry,
    update_asset,
    update_risk_scenario,
    update_applied_control,
    update_risk_assessment,
    update_perimeter,
    update_requirement_assessment,
    update_requirement_assessments,
    update_quantitative_risk_study,
    update_quantitative_risk_scenario,
    update_quantitative_risk_hypothesis,
    update_task_template,
    delete_task_template,
    create_entity,
    create_entity_assessment,
    create_representative,
    create_solution,
    create_contract,
    update_entity,
    update_entity_assessment,
    update_representative,
    update_solution,
    update_contract,
    create_ebios_rm_study,
    create_feared_event,
    create_ro_to_couple,
    create_stakeholder,
    create_strategic_scenario,
    create_attack_path,
    create_operational_scenario,
    create_elementary_action,
    create_operating_mode,
    create_kill_chain_step,
    update_ebios_rm_study,
    update_feared_event,
    update_ro_to_couple,
    update_stakeholder,
    update_strategic_scenario,
    update_attack_path,
    update_operational_scenario,
    update_operating_mode,
    update_kill_chain_step,
]


def register_all_tools(target_mcp, remote: bool = False):
    """
    Register every CISO Assistant tool with the given FastMCP instance.

    Shared between the local stdio server (`ca_mcp.py`) and the remote
    HTTP/OAuth server (`ca_mcp_http.py`) so both expose the same toolset.
    `create_evidence` reads files from the MCP host's disk, so it is only
    offered to the local stdio server.
    """
    for tool in READ_TOOLS:
        target_mcp.tool()(tool)
    for tool in WRITE_TOOLS:
        if remote and tool is create_evidence:
            continue
        target_mcp.tool()(tool)


# Register all tools on the default (stdio) MCP instance
register_all_tools(mcp)


def run_server():
    """Run the MCP server over stdio (used by Claude Desktop's mcpServers config)"""
    mcp.run(transport="stdio")


if __name__ == "__main__":
    run_server()
