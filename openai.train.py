import json

# Read lines from TXT file
with open('trainingScripts.txt', 'r') as f:
    lines = f.readlines()

# Convert to JSONL format
with open('trainingScripts.jsonl', 'w') as f:
    for line in lines:
        json_line = json.dumps({"text": line.strip()})
        f.write(json_line + '\n')


