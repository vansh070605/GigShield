from pydantic import BaseModel

class PremiumRequest(BaseModel):
    coverage_amount: float
    location: str
    subscription_type: str

class PremiumResponse(BaseModel):
    location_risk: float
    weather_risk: float
    historical_risk: float
    base_rate: float
    computed_premium: float
    recommended_plan: str
