from flask import Flask, request, jsonify
import requests

# Initialize Flask app
app = Flask(__name__)

# Hugging Face Inference API details
API_URL = "https://api-inference.huggingface.co/models/njwrigh92/t-5-comedy"
headers = {"Authorization": "Bearer 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"}


def query_huggingface_api(prompt):
    payload = {"inputs": prompt}
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()


@app.route('/infer', methods=['POST'])
def infer():
    prompt = request.json['prompt']
    response = query_huggingface_api(prompt)
    return jsonify(response)


if __name__ == '__main__':
    app.run(port=5000)
