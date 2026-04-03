import random

def calculate_premium(location: str, coverage_amount: float, subscription_type: str):
    # Simulated ML model for Premium Calculation
    location_risk = random.uniform(10.0, 90.0)
    weather_risk = random.uniform(5.0, 80.0)
    historical_risk = random.uniform(0.0, 50.0)

    base_rate = coverage_amount * 0.01  # 1% base rate
    
    # Simple rule-based calculation to simulate ML output
    risk_multiplier = 1.0 + (location_risk + weather_risk + historical_risk) / 300.0
    
    computed_premium = base_rate * risk_multiplier
    
    if subscription_type == "monthly":
        computed_premium *= 3.8 # small discount for monthly
    
    return {
        "location_risk": round(location_risk, 2),
        "weather_risk": round(weather_risk, 2),
        "historical_risk": round(historical_risk, 2),
        "base_rate": round(base_rate, 2),
        "computed_premium": round(computed_premium, 2),
        "recommended_plan": "Standard" if computed_premium > 50 else "Basic"
    }
