from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    claim_type = Column(String, nullable=False) # parametric or manual
    amount = Column(Float, nullable=False)
    status = Column(String, default="pending") # pending, approved, rejected, paid
    reason = Column(String, nullable=True)
    fraud_flag = Column(String, default="cleared") # cleared, investigating, flagged
    fraud_score = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    resolved_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User")
    policy = relationship("Policy")
