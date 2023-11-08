from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Initialize Flask app and CORS
app = Flask(__name__)

# Load the model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("njwrigh92/t-5-comedy")
model = AutoModelForSeq2SeqLM.from_pretrained("njwrigh92/t-5-comedy")


def generate_response(message):
    inputs = tokenizer(message, return_tensors='pt', truncation=True)
    outputs = model.generate(
        **inputs,
        max_length=500,
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
