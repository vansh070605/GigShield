from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    coverage_amount = Column(Float, nullable=False)
    region = Column(String, nullable=False)
    subscription_type = Column(String, nullable=False) # weekly or monthly
    premium_amount = Column(Float, nullable=False)
    status = Column(String, default="active") # active, cancelled, expired
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    cancelled_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User")
