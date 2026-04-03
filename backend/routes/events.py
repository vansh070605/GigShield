from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from utils.deps import get_db
from schemas.event import EventResponse
from models.event import Event
from services.event_service import generate_mock_event
from services.claims_service import check_parametric_triggers

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
def get_active_events(db: Session = Depends(get_db)):
    return db.query(Event).filter(Event.is_active == True).all()

@router.post("/simulate")
def simulate_event(location: str, db: Session = Depends(get_db)):
    event_data = generate_mock_event(location)
    db_event = Event(**event_data)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    # Trigger parametric claims
    triggered_claims = check_parametric_triggers(db, location, event_data["event_type"])
    
    return {
        "event": db_event,
        "triggered_claims_count": len(triggered_claims)
    }
