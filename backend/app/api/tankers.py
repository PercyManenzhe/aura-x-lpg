from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
import random
from datetime import datetime

router = APIRouter()

# Mock tanker data
mock_tankers = [
    {"id": "TK-001", "name": "Tanker Alpha", "capacity": 5000, "current_load": 4200, "location": "Cape Town", "status": "active", "lat": -33.9249, "lon": 18.4241},
    {"id": "TK-002", "name": "Tanker Beta", "capacity": 5000, "current_load": 2100, "location": "Durban", "status": "active", "lat": -29.8587, "lon": 31.0192},
    {"id": "TK-003", "name": "Tanker Gamma", "capacity": 5000, "current_load": 0, "location": "Johannesburg", "status": "idle", "lat": -26.2023, "lon": 28.0436},
    {"id": "TK-004", "name": "Tanker Delta", "capacity": 5000, "current_load": 1500, "location": "Port Elizabeth", "status": "maintenance", "lat": -33.9669, "lon": 25.6007},
]

@router.get("/")
def get_tankers(db: Session = Depends(get_db)):
    """Get all tankers in fleet"""
    return mock_tankers

@router.get("/{tanker_id}")
def get_tanker(tanker_id: str, db: Session = Depends(get_db)):
    """Get specific tanker details"""
    tanker = next((t for t in mock_tankers if t["id"] == tanker_id), None)
    if not tanker:
        return {"error": "Tanker not found"}
    return tanker

@router.get("/{tanker_id}/tracking")
def get_tanker_tracking(tanker_id: str, db: Session = Depends(get_db)):
    """Get real-time tracking for tanker"""
    tanker = next((t for t in mock_tankers if t["id"] == tanker_id), None)
    if not tanker:
        return {"error": "Tanker not found"}
    
    return {
        "tanker_id": tanker_id,
        "location": tanker["location"],
        "coordinates": {"lat": tanker["lat"], "lon": tanker["lon"]},
        "speed": round(random.uniform(60, 100), 1),
        "current_load": tanker["current_load"],
        "capacity": tanker["capacity"],
        "status": tanker["status"],
        "timestamp": datetime.now().isoformat(),
        "destination": "Next Depot",
        "eta_hours": round(random.uniform(1, 6), 1)
    }

@router.patch("/{tanker_id}/status")
def update_tanker_status(tanker_id: str, new_status: str, db: Session = Depends(get_db)):
    """Update tanker status"""
    tanker = next((t for t in mock_tankers if t["id"] == tanker_id), None)
    if not tanker:
        return {"error": "Tanker not found"}
    
    tanker["status"] = new_status
    return {"tanker_id": tanker_id, "status": new_status, "updated_at": datetime.now().isoformat()}

@router.patch("/{tanker_id}/load")
def update_tanker_load(tanker_id: str, new_load: float, db: Session = Depends(get_db)):
    """Update tanker current load"""
    tanker = next((t for t in mock_tankers if t["id"] == tanker_id), None)
    if not tanker:
        return {"error": "Tanker not found"}
    
    if new_load > tanker["capacity"]:
        return {"error": f"Load exceeds capacity of {tanker['capacity']}"}
    
    tanker["current_load"] = new_load
    return {"tanker_id": tanker_id, "current_load": new_load, "capacity": tanker["capacity"]}

@router.get("/status/{status}")
def get_tankers_by_status(status: str, db: Session = Depends(get_db)):
    """Get all tankers with specific status"""
    filtered = [t for t in mock_tankers if t["status"] == status]
    return {"status": status, "count": len(filtered), "tankers": filtered}
