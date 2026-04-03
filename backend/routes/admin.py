from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from utils.deps import get_db
from models.claim import Claim
from schemas.claim import ClaimResponse
from pydantic import BaseModel

router = APIRouter()

class ClaimStatusUpdate(BaseModel):
    status: str
    fraud_flag: str

@router.get("/fraud-claims", response_model=List[ClaimResponse])
def get_fraud_claims(db: Session = Depends(get_db)):
    return db.query(Claim).filter(Claim.status.in_(["pending", "investigating", "flagged"])).all()

@router.get("/stats")
def get_admin_stats(db: Session = Depends(get_db)):
    total_claims = db.query(Claim).count()
    flagged = db.query(Claim).filter(Claim.fraud_flag == "flagged").count()
    cleared = db.query(Claim).filter(Claim.fraud_flag == "cleared").count()
    investigating = db.query(Claim).filter(Claim.fraud_flag == "investigating").count()
    
    return {
        "total_claims": total_claims,
        "flagged": flagged,
        "cleared": cleared,
        "investigating": investigating
    }

@router.patch("/claims/{claim_id}/status", response_model=ClaimResponse)
def update_claim_status(claim_id: int, update: ClaimStatusUpdate, db: Session = Depends(get_db)):
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    
    claim.status = update.status
    claim.fraud_flag = update.fraud_flag
        
    db.commit()
    db.refresh(claim)
    return claim
