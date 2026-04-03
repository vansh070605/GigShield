import random

def check_fraud(amount: float, user_id: int, policy_id: int):
    # Simulated ML model
    score = random.uniform(0.0, 1.0)
    
    # Anomaly threshold
    if score > 0.8 or amount > 5000:
        return {"status": "flagged", "score": score}
    elif score > 0.5:
        return {"status": "investigating", "score": score}
    else:
        return {"status": "cleared", "score": score}
