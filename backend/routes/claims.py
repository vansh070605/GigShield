from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from utils.deps import get_db, get_current_user
from schemas.claim import ClaimCreate, ClaimResponse
from models.claim import Claim
from models.user import User
from services.claims_service import process_manual_claim

router = APIRouter()

@router.get("/", response_model=List[ClaimResponse])
def get_user_claims(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Claim).filter(Claim.user_id == current_user.id).all()

@router.post("/manual", response_model=ClaimResponse)
def create_manual_claim(claim: ClaimCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if claim.claim_type != "manual":
        raise HTTPException(status_code=400, detail="Invalid claim type")
    
    return process_manual_claim(db, current_user.id, claim.policy_id, claim.amount, claim.reason)
