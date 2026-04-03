from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PolicyBase(BaseModel):
    coverage_amount: float
    region: str
    subscription_type: str
    premium_amount: float

class PolicyCreate(PolicyBase):
    pass

class PolicyResponse(PolicyBase):
    id: int
    user_id: int
    status: str
    created_at: datetime
    cancelled_at: Optional[datetime] = None

    class Config:
        from_attributes = True
