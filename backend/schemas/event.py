from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    event_type: str
    title: str
    description: str
    severity: str
    location: str

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    triggered_at: datetime
    is_active: bool

    class Config:
        from_attributes = True
