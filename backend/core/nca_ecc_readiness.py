"""NCA ECC-1:2018 readiness built from records already stored in a domain.

The mapping is by the exact name of an applied control or document. Anything
that is not listed stays unmapped, so a renamed record cannot be reported as
covering a control it no longer matches.
"""

from __future__ import annotations

from typing import Any

import yaml

ECC_REF_ID = "essential-cybersecurity-controls"
ECC_EDITION = "ECC-1:2018"
ECC_ARABIC_NAME = "الضوابط الأساسية للأمن السيبراني"

# Exact names of applied controls and documents in this workspace.
# A name may support more than one ECC subdomain.
EVIDENCE_TO_ECC = {
    "Information Security Policy": ["1-3"],
    "Access Control Policy": ["1-3", "2-2"],
    "Security Committee Charter": ["1-2"],
    "Security Committee minutes — Q2 2026": ["1-2"],
    "Security Committee minutes — Q3 2026": ["1-2"],
    "Secure Development Lifecycle for Firmware": ["1-6"],
    "Security Awareness Training": ["1-10"],
    "Acceptable Use Policy": ["2-1"],
    "Multi-Factor Authentication (MFA)": ["2-2"],
    "Anti-Virus Software": ["2-3"],
    "Firewall": ["2-5"],
    "Network Segmentation": ["2-5"],
    "Data Loss Prevention (DLP)": ["2-7"],
    "Encryption": ["2-8"],
    "Cryptography and Key Management Standard": ["2-8"],
    "Backup and Recovery Policy": ["2-9"],
    "Backup and Restore Procedures": ["2-9"],
    "Vulnerability Management Procedure": ["2-10"],
    "Vulnerability Scanning": ["2-10"],
    "Patch Management": ["2-10"],
    "Intrusion Detection System (IDS)": ["2-12"],
    "Intrusion Prevention System (IPS)": ["2-12"],
    "Security Information and Event Management (SIEM)": ["2-12"],
    "Endpoint Detection and Response (EDR)": ["2-12"],
    "Incident Response Procedure": ["2-13"],
    "Incident Response Plan": ["2-13"],
    "Coordinated Vulnerability Disclosure Policy": ["2-13"],
    "Door and Facility Locks": ["2-14"],
    "Physical Security Controls": ["2-14"],
    "Disaster Recovery Plan": ["3-1"],
    "Business Continuity Plan": ["3-1"],
    "Supplier Security Policy": ["4-1"],
    "OT Security Policy — Brno Assembly Plant": ["5-1"],
}

STATUS_RANK = {
    "gap": 0,
    "planned": 1,
    "partial": 2,
    "documented": 3,
    "covered": 4,
}


def control_posture(status: str | None) -> str:
    if status == "active":
        return "covered"
    if status == "in_progress":
        return "partial"
    return "planned"


def subdomain_status(postures: list[str]) -> str:
    if not postures:
        return "gap"
    return max(postures, key=lambda posture: STATUS_RANK[posture])


def ecc_outline_from_library(content: str | bytes | dict) -> list[dict[str, Any]]:
    if isinstance(content, bytes):
        content = content.decode("utf-8")
    if isinstance(content, str):
        content = yaml.safe_load(content) or {}
    if not isinstance(content, dict):
        return []
    framework = content.get("framework")
    if not isinstance(framework, dict):
        framework = (content.get("objects") or {}).get("framework") or {}
    nodes = framework.get("requirement_nodes") or []
    sections: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    for node in nodes:
        depth = node.get("depth")
        if depth == 1:
            current = {
                "ref_id": str(node.get("ref_id") or ""),
                "name": node.get("name") or "",
                "subdomains": [],
            }
            sections.append(current)
        elif depth == 2 and current is not None and node.get("name"):
            current["subdomains"].append(
                {
                    "ref_id": str(node.get("ref_id") or ""),
                    "name": node.get("name") or "",
                }
            )
    return sections


def evidence_refs(name: str) -> list[str]:
    return list(EVIDENCE_TO_ECC.get((name or "").strip(), []))


def assemble_domain_report(
    *,
    folder_id: str,
    folder_name: str,
    outline: list[dict[str, Any]],
    evidence: list[dict[str, Any]],
) -> dict[str, Any]:
    by_ref: dict[str, list[dict[str, Any]]] = {}
    unmapped: list[dict[str, Any]] = []
    for item in evidence:
        refs = item.get("ecc_refs") or []
        if not refs:
            unmapped.append(item)
            continue
        for ref in refs:
            by_ref.setdefault(ref, []).append(item)

    sections = []
    counts = {key: 0 for key in STATUS_RANK}
    for section in outline:
        subdomains = []
        for subdomain in section["subdomains"]:
            matched = by_ref.get(subdomain["ref_id"], [])
            status = subdomain_status([item["posture"] for item in matched])
            counts[status] += 1
            subdomains.append(
                {
                    "ref_id": subdomain["ref_id"],
                    "name": subdomain["name"],
                    "status": status,
                    "evidence": matched,
                }
            )
        sections.append(
            {
                "ref_id": section["ref_id"],
                "name": section["name"],
                "subdomains": subdomains,
            }
        )

    return {
        "id": folder_id,
        "name": folder_name,
        "summary": {
            "subdomains": sum(counts.values()),
            **counts,
            "controls": sum(1 for item in evidence if item["kind"] == "control"),
            "documents": sum(1 for item in evidence if item["kind"] == "document"),
            "unmapped": len(unmapped),
        },
        "sections": sections,
        "unmapped": unmapped,
    }
