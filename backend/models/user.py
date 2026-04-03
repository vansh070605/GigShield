from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    occupation = Column(String)
    risk_profile = Column(String, default="low")
    role = Column(String, default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
