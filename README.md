## Inspiration
Inspired by gamified system ideas, where people complete some tasks to earn some points and rewards.

## What it does
It gamify responsible energy consumption by turning observations and problems related to clean energy consumption into a list of campaigns with checklist of tasks to be completed.

## How we built it
We built it by collecting user requirement, as well as related data such as monthly electricity bill and power consumption by department, then feed these information to LLM to generate campaigns tailored for the company's problems. Additionally, we built a knowledge pool of ways to improve energy efficiency and use RAG (Retrieval-Augmented-Generator) for the model to learn based on gathered knowledge.

### Prerequisites
* Node.js & npm
* Python 3.10+

### Set up api key
```bash
touch .env
echo "GEMINI_API_KEY={your_api_key}" > .env
```
### Backend Setup
```bash
cd .\volta\
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd .\volta\
npm install
npm run dev
```
