#!/usr/bin/env python3
"""
Convert a YAML library file to Muraji API JSON format.
Usage: python convert_to_muraji_json.py <input.yaml> <new_urn_suffix> <output.json>
"""

import yaml
import json
import sys
import re

def convert_urns(obj, old_suffix, new_suffix):
    """Recursively replace URN suffixes in all strings AND dictionary keys."""
    if isinstance(obj, dict):
        # Convert both keys and values
        new_dict = {}
        for k, v in obj.items():
            # Convert key if it's a string containing URN
            new_key = k
            if isinstance(k, str):
                new_key = k.replace(f':{old_suffix}:', f':{new_suffix}:').replace(f':{old_suffix}', f':{new_suffix}')
            new_dict[new_key] = convert_urns(v, old_suffix, new_suffix)
        return new_dict
    elif isinstance(obj, list):
        return [convert_urns(item, old_suffix, new_suffix) for item in obj]
    elif isinstance(obj, str):
        # Replace the old URN pattern with new one
        return obj.replace(f':{old_suffix}:', f':{new_suffix}:').replace(f':{old_suffix}', f':{new_suffix}')
    else:
        return obj

def convert_yaml_to_muraji_json(input_file, new_urn_suffix, output_file):
    """Convert YAML library to Muraji API JSON format."""
    
    # Load YAML
    with open(input_file, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    
    # Extract the original URN suffix (e.g., "adobe-ccf-v5")
    original_urn = data.get('urn', '')
    old_suffix = original_urn.split(':')[-1] if ':' in original_urn else ''
    
    print(f"Original URN suffix: {old_suffix}")
    print(f"New URN suffix: {new_urn_suffix}")
    
    # Convert all URNs in the data
    data = convert_urns(data, old_suffix, new_urn_suffix)
    
    # Update top-level fields
    data['urn'] = f"urn:intuitem:risk:library:{new_urn_suffix}"
    data['ref_id'] = new_urn_suffix
    
    # Structure for Muraji API format
    # Muraji stores: { urn, locale, ref_id, name, ..., content: { framework: {...} } }
    muraji_format = {
        "urn": data['urn'],
        "locale": data.get('locale', 'en'),
        "ref_id": data['ref_id'],
        "name": data.get('name', ''),
        "description": data.get('description', ''),
        "copyright": data.get('copyright', ''),
        "version": data.get('version', 1),
        "provider": data.get('provider', ''),
        "packager": data.get('packager', ''),
        "publication_date": str(data.get('publication_date', '')) if data.get('publication_date') else None,
        "content": data.get('objects', {})  # The framework goes into 'content'
    }
    
    # Update framework URN and ref_id if exists
    if 'framework' in muraji_format['content']:
        fw = muraji_format['content']['framework']
        fw['urn'] = f"urn:intuitem:risk:framework:{new_urn_suffix}"
        fw['ref_id'] = new_urn_suffix
    
    # Write JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(muraji_format, f, ensure_ascii=False, indent=2)
    
    # Count requirement nodes
    req_nodes = muraji_format['content'].get('framework', {}).get('requirement_nodes', [])
    print(f"Converted {len(req_nodes)} requirement nodes")
    print(f"Output written to: {output_file}")
    
    return muraji_format

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python convert_to_muraji_json.py <input.yaml> <new_urn_suffix> <output.json>")
        print("Example: python convert_to_muraji_json.py adobe-ccf-v5.yaml adobev2 adobev2.json")
        sys.exit(1)
    
    input_file = sys.argv[1]
    new_urn_suffix = sys.argv[2]
    output_file = sys.argv[3]
    
    convert_yaml_to_muraji_json(input_file, new_urn_suffix, output_file)
