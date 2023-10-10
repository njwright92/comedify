from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM

# Initialize Flask app and CORS
app = Flask(__name__)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/phi-1_5")
model = AutoModelForCausalLM.from_pretrained(
    "microsoft/phi-1_5", trust_remote_code=True
)


def generate_response(message):
    inputs = tokenizer(message, return_tensors='pt', truncation=True)
    outputs = model.generate(
        **inputs,
        max_length=150,
        pad_token_id=tokenizer.eos_token_id
    )
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response


@app.route('/infer', methods=['POST'])
def infer():
    message = request.json['prompt']
    response = generate_response(message)
    return jsonify({'response': response})


if __name__ == '__main__':
    app.run(port=5000)
