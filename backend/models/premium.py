from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class Premium(Base):
    __tablename__ = "premiums"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, ForeignKey("policies.id"), nullable=False)
    location_risk = Column(Float, nullable=False)
    weather_risk = Column(Float, nullable=False)
    historical_risk = Column(Float, nullable=False)
    base_rate = Column(Float, nullable=False)
    computed_premium = Column(Float, nullable=False)
    calculated_at = Column(DateTime(timezone=True), server_default=func.now())
