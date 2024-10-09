from flask import Flask, request, jsonify
import spacy

# Load English language model
nlp = spacy.load('en_core_web_sm')


def extract_nouns(text):
    # Process the text with spaCy
    doc = nlp(text)

    # Extract nouns from the document
    nouns = [token.text for token in doc if token.pos_ == 'NOUN']

    return nouns

app = Flask(__name__)


@app.route('/api/parse_text', methods=['GET'])
def parse_text():
    # Extract the text from the query parameters
    text = request.args.get('text')

    # Check if text parameter is provided
    if not text:
        return jsonify({"error": "Text parameter is missing."}), 400

    # Split the text into an array of strings (assuming space-separated words)
    words = extract_nouns(text)
    # Return the array of strings
    return jsonify({"words": words})


if __name__ == '__main__':
    print("server running")
    app.run(debug=True)

