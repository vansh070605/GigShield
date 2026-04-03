from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from utils.deps import get_db, get_current_user
from schemas.policy import PolicyCreate, PolicyResponse
from models.policy import Policy
from models.user import User

router = APIRouter()

@router.post("/", response_model=PolicyResponse)
def create_policy(policy: PolicyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_policy = Policy(
        user_id=current_user.id,
        coverage_amount=policy.coverage_amount,
        region=policy.region,
        subscription_type=policy.subscription_type,
        premium_amount=policy.premium_amount,
        status="active"
    )
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    return new_policy

@router.get("/", response_model=List[PolicyResponse])
def get_user_policies(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Policy).filter(Policy.user_id == current_user.id).all()

@router.patch("/{policy_id}/cancel", response_model=PolicyResponse)
def cancel_policy(policy_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    policy = db.query(Policy).filter(Policy.id == policy_id, Policy.user_id == current_user.id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    
    from sqlalchemy.sql import func
    policy.status = "cancelled"
    policy.cancelled_at = func.now()
    db.commit()
    db.refresh(policy)
    return policy
