import re
import json

file_path = 'C:/Users/Melker-Desktop/Desktop/skola/vue/project/my-vue-app/t.js'

# Attempt to read and parse the JavaScript file to extract keys
def extract_keys_from_js_file(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Simplistic extraction based on the assumption that the object is well-formed and begins with '{' and ends with '}'
    # This might not work for all JavaScript structures, especially if there are nested objects or complex syntaxes.
    object_pattern = r'=\s*{([^}]+)}'
    match = re.search(object_pattern, content, re.DOTALL)
    
    if match:
        object_content = match.group(1)
        
        # Extract keys from the object content
        key_pattern = r'(\w+):'
        keys = re.findall(key_pattern, object_content)
        
        return keys
    else:
        return []

# Create the mapping dictionary
def create_mapping(keys):
    key_mapping = {key: key for key in keys}  # Simple mapping, key to itself
    return key_mapping

keys = extract_keys_from_js_file(file_path)
key_mapping = create_mapping(keys)

# Optionally, convert the mapping to a JSON string for easy viewing or use in JavaScript
key_mapping_json = json.dumps(key_mapping, indent=4)
print(key_mapping_json)
