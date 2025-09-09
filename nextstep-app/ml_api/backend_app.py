# backend_app.py
from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity

# ===========================
# Load and preprocess dataset
# ===========================
df = pd.read_csv("Career_with_Skills_and_Education_final.csv")
  # dataset same folder me hona chahiye

# RIASEC columns
riasec_cols = ["R", "I", "A", "S", "E", "C"]

# Scale dataset RIASEC values
scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df[riasec_cols])
df[riasec_cols] = df_scaled

# Identify skill columns
exclude_cols = ["O*NET-SOC Code", "Title", "Description", "Minimum Education Required"] + riasec_cols + ["similarity"]
skill_cols = [col for col in df.columns if col not in exclude_cols]

# Convert skills to numeric
df[skill_cols] = df[skill_cols].apply(pd.to_numeric, errors="coerce")

# ===========================
# FastAPI Setup
# ===========================
app = FastAPI(title="Career Recommendation API")

# Input schema
class UserVector(BaseModel):
    R: float
    I: float
    A: float
    S: float
    E: float
    C: float
    top_n: int = 1  # default 5 recommendations

# Recommendation function
def recommend_jobs(user_vector: dict, top_n=10):
    # User input scale karo
    input_data = pd.DataFrame([user_vector])
    input_scaled = scaler.transform(input_data)

    # Cosine similarity
    similarities = cosine_similarity(input_scaled, df[riasec_cols])[0]
    similarities = (similarities + 1) / 2  # normalize [0,1]
    df["similarity"] = similarities

    # Top jobs
    top_jobs = df.sort_values(by="similarity", ascending=False).head(top_n)

    results = []
    for _, row in top_jobs.iterrows():
        # Top 3 skills
        skill_values = row[skill_cols].dropna().sort_values(ascending=False)
        top_3_skills = list(skill_values.index[:3])

        results.append({
            "Job Title": row["Title"],
            "Description": row["Description"],
            "Similarity": round(row["similarity"], 3),
            "Top 3 Skills": top_3_skills,
            "Minimum Education": row["Minimum Education Required"]
        })

    return results

# API Endpoint
@app.post("/recommend_jobs")
def get_recommendations(user_input: UserVector):
    user_vector = {
        "R": user_input.R,
        "I": user_input.I,
        "A": user_input.A,
        "S": user_input.S,
        "E": user_input.E,
        "C": user_input.C,
    }
    recommendations = recommend_jobs(user_vector, top_n=user_input.top_n)
    return {"recommendations": recommendations}
