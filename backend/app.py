from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.parser import extract_text
from utils.skill_matcher import analyze_skills

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    resume = request.files['resume']
    jd = request.files['job_description']

    resume_text = extract_text(resume)
    jd_text = extract_text(jd)

    analysis = analyze_skills(resume_text, jd_text)

    return jsonify(analysis)

if __name__ == '__main__':
    app.run(debug=True)
