import requests
import re
from thefuzz import fuzz
import json

import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not set.")
genai.configure(api_key=GEMINI_API_KEY)
MODEL_NAME = "gemini-1.5-flash-latest"

try:
    # Initialize the generative model
    model = genai.GenerativeModel(MODEL_NAME)
    print(f"Successfully initialized model: {MODEL_NAME}") # Confirmation
except Exception as e:
    print(f"Error initializing Gemini model {MODEL_NAME}: {e}")

def normalize(skill):
    # Remove bullet characters and normalize the string
    skill = re.sub(r"[-•]", "", skill)  # remove bullet characters
    skill = skill.lower().strip()
    return skill


def fuzzy_match(skill, skills_list, threshold=80):
    # Compare skill with list of skills using fuzzy matching
    for s in skills_list:
        if fuzz.partial_ratio(normalize(skill), normalize(s)) >= threshold:
            return True
    return False


def analyze_skills(resume_text, jd_text):
    prompt = f"""
Analyze the following resume against the job description.

1. Extract a bullet-point list of skills mentioned in the job description as "jd_skills".
2. Extract a bullet-point list of skills mentioned in the resume as "resume_skills".
3. From the jd_skills, identify the "matched_skills" that are also present (or closely related) in the resume_skills.
4. Identify the "missing_skills" that are in jd_skills but not in resume_skills.
5. Calculate the "score" as the percentage of matched_skills over total jd_skills (rounded to nearest integer).

Provide the output *only* as a JSON object in the following format:
{{
    "jd_skills": [list of bullet-point JD skills],
    "matched_skills": [list of bullet-point skills matched from the resume],
    "missing_skills": [list of bullet-point skills from the JD not found in the resume],
    "resume_skills": [list of bullet-point resume skills],
    "score": integer (match percentage)
}}

Do not include any explanation, formatting, or text outside the JSON response.

Resume:
'''
{resume_text}
'''

Job Description:
'''
{jd_text}
'''
"""


    try:
        # Make the API call
        # Add generation configurations if needed, e.g., temperature=0
        # Flash models are generally fast, so default settings are often fine
        response = model.generate_content(prompt)

        # Access the text from the response
        gemini_output = response.text

        # Sometimes the model might include markdown like ```json\n...\n```
        # Clean it up before parsing
        gemini_output = gemini_output.strip()
        if gemini_output.startswith("```json"):
            gemini_output = gemini_output[7:]
            if gemini_output.endswith("```"):
                gemini_output = gemini_output[:-3]
            gemini_output = gemini_output.strip() # Strip again after removing fences

        # Parse the JSON output
        analysis_result = json.loads(gemini_output)

        return analysis_result

    except Exception as e:
        # Catch potential errors during API call or JSON parsing
        print(f"Error during Gemini API call or processing: {e}")
        # Return an error structure that the Flask route can handle
        return {"error": "Could not process skill analysis", "details": str(e)}
