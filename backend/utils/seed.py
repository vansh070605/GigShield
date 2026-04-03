from database import SessionLocal, create_tables
from models.user import User
from models.policy import Policy
from models.claim import Claim
from services.auth_service import get_password_hash

def seed_db():
    create_tables()
    db = SessionLocal()
    
    # Check if we already have users
    if db.query(User).first():
        print("Database already seeded.")
        db.close()
        return

    # Seed User
    test_user = User(
        email="test@gigshield.com",
        password_hash=get_password_hash("password123"),
        name="Rahul Delivery",
        location="Mumbai, Maharashtra",
        occupation="Delivery Partner",
        risk_profile="medium"
    )
    db.add(test_user)
    db.commit()
    db.refresh(test_user)

    # Seed Policy
    test_policy = Policy(
        user_id=test_user.id,
        coverage_amount=5000.0,
        region="Mumbai, Maharashtra",
        subscription_type="weekly",
        premium_amount=55.5
    )
    db.add(test_policy)
    db.commit()
    db.refresh(test_policy)

    # Seed some fraud claims for admin panel
    fraud_claims = [
        Claim(user_id=test_user.id, policy_id=test_policy.id, claim_type="manual", amount=4500, reason="Engine damage", status="flagged", fraud_flag="flagged", fraud_score=0.85),
        Claim(user_id=test_user.id, policy_id=test_policy.id, claim_type="manual", amount=1200, reason="Rain delay", status="investigating", fraud_flag="investigating", fraud_score=0.65),
    ]
    db.add_all(fraud_claims)
    db.commit()

    print("Database seeded with test user: test@gigshield.com / password123")
    db.close()

if __name__ == "__main__":
    seed_db()
