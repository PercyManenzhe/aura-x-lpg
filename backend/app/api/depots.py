from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db

router = APIRouter()

# Mock depot data
mock_depots = [
    {"id": 1, "name": "Cape Town Depot", "province": "Western Cape", "stock": 8500, "capacity": 10000, "status": "operational", "lat": -33.9249, "lon": 18.4241},
    {"id": 2, "name": "Durban Hub", "province": "KwaZulu-Natal", "stock": 4200, "capacity": 10000, "status": "alert", "lat": -29.8587, "lon": 31.0192},
    {"id": 3, "name": "Johannesburg Terminal", "province": "Gauteng", "stock": 7100, "capacity": 10000, "status": "operational", "lat": -26.2023, "lon": 28.0436},
    {"id": 4, "name": "Port Elizabeth Station", "province": "Eastern Cape", "stock": 3800, "capacity": 10000, "status": "maintenance", "lat": -33.9669, "lon": 25.6007},
]

@router.get("/")
def get_depots(db: Session = Depends(get_db)):
    """Get all depots"""
    return mock_depots

@router.get("/{depot_id}")
def get_depot(depot_id: int, db: Session = Depends(get_db)):
    """Get specific depot details"""
    depot = next((d for d in mock_depots if d["id"] == depot_id), None)
    if not depot:
        return {"error": "Depot not found"}
    return depot

@router.post("/")
def create_depot(depot: dict, db: Session = Depends(get_db)):
    """Create a new depot"""
    new_depot = {
        "id": max([d["id"] for d in mock_depots]) + 1,
        **depot
    }
    mock_depots.append(new_depot)
    return new_depot

@router.put("/{depot_id}")
def update_depot(depot_id: int, updated_data: dict, db: Session = Depends(get_db)):
    """Update depot details"""
    depot = next((d for d in mock_depots if d["id"] == depot_id), None)
    if not depot:
        return {"error": "Depot not found"}
    
    depot.update(updated_data)
    return depot

@router.patch("/{depot_id}/stock")
def update_stock(depot_id: int, new_stock: float, db: Session = Depends(get_db)):
    """Update depot stock level"""
    depot = next((d for d in mock_depots if d["id"] == depot_id), None)
    if not depot:
        return {"error": "Depot not found"}
    
    depot["stock"] = new_stock
    return {"depot_id": depot_id, "new_stock": new_stock, "status": "updated"}