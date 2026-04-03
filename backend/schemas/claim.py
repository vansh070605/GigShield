from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClaimBase(BaseModel):
    policy_id: int
    amount: float
    reason: Optional[str] = None

class ClaimCreate(ClaimBase):
    claim_type: str # "parametric" or "manual"

class ClaimResponse(ClaimBase):
    id: int
    user_id: int
    claim_type: str
    status: str
    fraud_flag: str
    fraud_score: Optional[float] = None
    created_at: datetime
    resolved_at: Optional[datetime] = None

    class Config:
        from_attributes = True
