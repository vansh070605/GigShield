import random

DISRUPTIONS = [
    {"type": "weather", "title": "Heavy Rain", "description": "Severe waterlogging expected.", "severity": "high"},
    {"type": "roadblock", "title": "Protest Rally", "description": "Major roads blocked in downtown.", "severity": "medium"},
    {"type": "government", "title": "Curfew", "description": "Section 144 imposed.", "severity": "high"}
]

def generate_mock_event(location: str):
    event_data = random.choice(DISRUPTIONS)
    return {
        "event_type": event_data["type"],
        "title": event_data["title"],
        "description": event_data["description"],
        "severity": event_data["severity"],
        "location": location
    }
