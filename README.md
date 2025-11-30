```markdown
# Volta
Energy-efficiency recommender that gamifies building- and team-level actions to reduce energy consumption.

Volta turns observations and problems about energy use into actionable "campaigns" with checklists, incentives, and feedback loops. It makes energy savings fun, measurable, and repeatable — helping organizations reduce consumption while rewarding teams and individuals for impacts they can see.

---

## Table of contents
- [Why Volta?](#why-volta)
- [Key features](#key-features)
- [How it works (high level)](#how-it-works-high-level)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Quickstart (developer)](#quickstart-developer)
  - [Prerequisites](#prerequisites)
  - [Environment variables](#environment-variables)
  - [Backend setup](#backend-setup)
  - [Frontend setup](#frontend-setup)
- [Usage examples](#usage-examples)
- [Data & privacy](#data--privacy)
- [Extending Volta](#extending-volta)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License & contact](#license--contact)

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
- Gamification: points, badges, leaderboards, and progress streaks.
- Recommendations: LLM-powered explanations and prioritized suggestions.
- Reporting & analytics: baseline and post-action estimates for energy and cost savings.
- Integrations: import data from CSVs, building management systems, and IoT meters.
- Admin dashboard: manage campaigns, users, teams, and reward rules.

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
- Frontend: JavaScript/TypeScript with a modern framework (Vite / React) — responsive UI for dashboards, campaign flows, and gamification.
- AI: Large language model (configured via GEMINI_API_KEY in this repo) for generating campaign text and explanations.
- Data storage: relational DB (Postgres recommended) for users, campaigns, tasks, and metrics.
- Optional: Redis for caching and real-time leaderboards, and a background job system (Celery/RQ) for long-running tasks like dataset processing.
- Containerization: Docker (recommended) for reproducible dev and production environments.

---

## Quickstart (developer)

### Prerequisites
- Node.js (16+)
- npm or yarn
- Python 3.10+
- pip
- (recommended) Docker & docker-compose
- A GEMINI/API key (or substitute your LLM provider key)

### Environment variables
Create a `.env` at the project root. Minimum variables:
GEMINI_API_KEY and others used by your config. Example:
```bash
touch .env
echo "GEMINI_API_KEY={your_api_key}" > .env
# Add database and secret variables as needed:
# echo "DATABASE_URL=postgresql://user:pass@localhost:5432/volta" >> .env
# echo "SECRET_KEY=supersecret" >> .env
```

### Backend setup
```bash
# from repo root or backend folder (adjust path if backend is in a subfolder)
cd volta
python -m venv .venv
source .venv/bin/activate      # macOS / Linux
.\.venv\Scripts\activate        # Windows PowerShell

pip install -r requirements.txt

# Run migrations if present (example)
# alembic upgrade head

# Start dev server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend endpoints (examples)
- GET /health — health check
- POST /api/v1/import — upload CSV or bill data
- POST /api/v1/campaigns/generate — generate campaign from provided data
- GET /api/v1/campaigns — list campaigns
- POST /api/v1/tasks/{task_id}/complete — complete a task

(Adjust endpoints to match your implementation.)

### Frontend setup
```bash
cd volta    # or the frontend subfolder if split
npm install
npm run dev
# open http://localhost:5173 (or console-provided url)
```

---

## Usage examples

Generate a campaign (example curl)
```bash
curl -X POST "http://localhost:8000/api/v1/campaigns/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "site_name": "Headquarters Building A",
    "monthly_bill": 12345,
    "meter_readings": [{"date":"2025-10-01","kwh":4300}, {"date":"2025-09-01","kwh":4100}],
    "observations": "Conference room lights often left on after hours"
  }'
```

Complete a task
```bash
curl -X POST "http://localhost:8000/api/v1/tasks/678/complete" \
  -H "Authorization: Bearer <token>"
```

Sample response formats and exact API routes will depend on the backend implementation.

---

## Data & privacy
- Store only necessary billing / meter metadata. Avoid PII where possible.
- Mask or encrypt sensitive identifiers (user emails, device IDs) at rest.
- If integrating third-party LLMs, do not send raw PII to the model unless permitted by policy; prefer aggregated or anonymized context.
- Provide admins with the ability to delete or export user data to comply with privacy requests.

---

## Extending Volta
Ideas for extension:
- Add a rules engine to auto-trigger campaigns for specific anomaly patterns.
- Integrate with smart building APIs (BACnet, Modbus) and IoT platforms (MQTT).
- Implement device-level micro-actions that auto-schedule HVAC setbacks or lighting reductions.
- Create a mobile app or Slack/MS Teams integration for task nudges.
- Add sustainability KPIs (CO2e savings) and exportable executive reports.

---

## Contributing
We welcome contributions!
1. Fork the repo.
2. Create a feature branch: git checkout -b feat/your-feature
3. Run tests / linters and ensure code style.
4. Open a pull request describing your changes and motivation.

Please include tests for new features and update documentation when adding or changing behavior.

---

## Roadmap (short)
- [x] Basic campaign generation from bills and observations
- [x] Checklist tasks and task completion flow
- [ ] Leaderboards and team scoring
- [ ] Background jobs for batch data processing
- [ ] Integrations with building management and IoT providers
- [ ] Mobile push notifications and chat integrations

---

## Troubleshooting & FAQ
- "LLM calls fail." — Verify GEMINI_API_KEY and network access; check rate limits.
- "No campaigns generated." — Ensure your input data includes enough context (meter history, observations). Try increasing the sample size or providing building characteristics.
- "I see incorrect savings estimates." — Check baseline period selection and ensure meter mapping is correct.

---

## License & contact
MIT License — see LICENSE file.

Maintainer: Heng-Yi-Kang
Project homepage / issues: https://github.com/Heng-Yi-Kang/volta

If you'd like, I can:
- add example screenshots or a GIF,
- create a CONTRIBUTING.md and ISSUE templates,
- or draft CI / CD and Docker Compose files for easier deployment. Tell me which you prefer next.
```
