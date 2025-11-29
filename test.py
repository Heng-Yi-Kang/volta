import json

response =[
    {
        "title": "HVAC Tune-Up Challenge",
        "tasks": [
            { "id": "t1", "text": "Clean/replace HVAC air filters", "points": 15, "completed": "false" },
            { "id": "t2", "text": "Optimize thermostat settings", "points": 20, "completed": "false" }
        ]
    },
    {
        "title": "LED Lighting Blitz",
        "tasks": [
            { "id": "t3", "text": "Audit current lighting infrastructure", "points": 10, "completed": "false" },
            { "id": "t4", "text": "Upgrade to energy-efficient LED bulbs", "points": 30, "completed": "false" }
        ]
    },
    {
        "title": "Energy Habits Campaign",
        "tasks": [
            { "id": "t5", "text": "Display 'switch off' reminders", "points": 10, "completed": "false" },
            { "id": "t6", "text": "Educate staff on energy-saving habits", "points": 20, "completed": "false" }
        ]
    },
    {
        "title": "Smart Monitoring Rollout",
        "tasks": [
            { "id": "t7", "text": "Implement real-time energy monitoring", "points": 30, "completed": "false" },
            { "id": "t8", "text": "Set up usage alerts for anomalies", "points": 25, "completed": "false" }
        ]
    },
    {
        "title": "Audit & Optimization Quest",
        "tasks": [
            { "id": "t9", "text": "Conduct comprehensive energy audit", "points": 25, "completed": "false" },
            { "id": "t10", "text": "Identify high-consumption equipment", "points": 20, "completed": "false" }
        ]
    }
]

# Use response directly, or print as JSON string
print(json.dumps(response, indent=2))
