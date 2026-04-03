from sqlalchemy.orm import Session
from models.claim import Claim
from models.policy import Policy
from services.fraud_service import check_fraud

def process_manual_claim(db: Session, user_id: int, policy_id: int, amount: float, reason: str):
    fraud_result = check_fraud(amount, user_id, policy_id)
    
    db_claim = Claim(
        user_id=user_id,
        policy_id=policy_id,
        claim_type="manual",
        amount=amount,
        reason=reason,
        status="pending" if fraud_result["status"] == "cleared" else fraud_result["status"],
        fraud_flag=fraud_result["status"],
        fraud_score=fraud_result["score"]
    )
    db.add(db_claim)
    db.commit()
    db.refresh(db_claim)
    return db_claim

def check_parametric_triggers(db: Session, location: str, event_type: str):
    # Find active policies in this location
    active_policies = db.query(Policy).filter(Policy.region == location, Policy.status == "active").all()
    triggered_claims = []
    
    for policy in active_policies:
        # Auto trigger claim
        payout_amount = policy.coverage_amount * 0.2 # 20% automatic payout for disruptions
        db_claim = Claim(
            user_id=policy.user_id,
            policy_id=policy.id,
            claim_type="parametric",
            amount=payout_amount,
            reason=f"Auto-triggered by {event_type} event in {location}",
            status="approved",
            fraud_flag="cleared",
            fraud_score=0.0
        )
        db.add(db_claim)
        triggered_claims.append(db_claim)
    
    db.commit()
    return triggered_claims
