```markdown
# Volta
Energy-efficiency recommender that gamifies building- and team-level actions to reduce energy consumption.

Volta turns observations and problems about energy use into actionable "campaigns" with checklists, incentives, and feedback loops. It makes energy savings fun, measurable, and repeatable — helping organizations reduce consumption while rewarding teams and individuals for impacts they can see.

---

## Why Volta?
Many organizations struggle to move from insight to action when it comes to energy efficiency. Volta closes that loop by:
- Translating usage data and observations into prioritized campaigns.
- Turning change into a game: checklists, points, badges, and leaderboards.
- Providing explanations and recommended actions powered by LLMs so non-experts can act.
- Tracking and reporting estimated savings so teams see tangible impact.

---

## Key features
- Campaign generator: automatically produce campaigns from energy bills, meter data, and user observations.
- Task checklists: step-by-step tasks with completion tracking and ownership.
- Gamification: points collected
- Recommendations: LLM-powered explanations and prioritized suggestions.
- Reporting & analytics: baseline and post-action estimates for energy and cost savings.


---

## How it works (high level)
1. Data ingestion: import monthly electricity bills, sub-meter or departmental power data, and user-submitted observations.
2. Analysis & normalization: normalize data and detect anomalies or high-usage patterns.
3. Campaign generation: an LLM (configured via GEMINI_API_KEY or similar) takes the data + business context and generates campaign proposals with task checklists, estimated impact, and suggested owners.
4. Gamification & assignment: campaigns are published to teams; users complete checklist items and earn points.
5. Reporting: the system estimates energy and cost savings and displays progress on dashboards and leaderboards.
6. Continuous improvement: completed tasks and measured outcomes feed back into the system to improve future recommendations.

---

## Architecture & Tech Stack
- Backend: Python 3.10+, FastAPI (uvicorn) — REST API that handles data ingestion, campaign generation, auth, and reporting.
- Frontend: JavaScript with a modern framework (Vite + React) — responsive UI for dashboards, campaign flows, and gamification.
- AI: Large language model (configured via GEMINI_API_KEY in this repo) for generating campaign text and explanations.
---

## Quickstart (developer)

### Prerequisites
- Node.js (16+)
- npm or yarn
- Python 3.10+
- pip
- A GEMINI API key 

### Environment variables
Create a `.env` at the project root. Minimum variables:
GEMINI_API_KEY and others used by your config. Example:
```bash
touch .env
echo "GEMINI_API_KEY={your_api_key}" > .env
```

### Backend setup
```bash
cd volta
python -m venv .venv
source .venv/bin/activate      # macOS / Linux
.\.venv\Scripts\activate        # Windows PowerShell

pip install -r requirements.txt

# Start dev server
uvicorn main:app --reload 
```



### Frontend setup
```bash
cd volta    # or the frontend subfolder if split
npm install
npm run dev
# open http://localhost:5173 (or console-provided url)
```

---

---

## Extending Volta
Ideas for extension:
- Add leaderboards and badges
- Add a rules engine to auto-trigger campaigns for specific anomaly patterns.
- Integrate with smart building APIs (BACnet, Modbus) and IoT platforms (MQTT).
- Implement device-level micro-actions that auto-schedule HVAC setbacks or lighting reductions.
- Create a mobile app or Slack/MS Teams integration for task nudges.
- Add sustainability KPIs (CO2e savings) and exportable executive reports.


---


## Troubleshooting & FAQ
- "LLM calls fail." — Verify GEMINI_API_KEY and network access; check rate limits.
- "No campaigns generated." — Ensure your input data includes enough context (meter history, observations). Try increasing the sample size or providing building characteristics.



