from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
import random

router = APIRouter()

# Mock inventory data
mock_inventory = [
    {"id": 1, "depot_id": 1, "product": "LPG", "quantity": 8500, "unit": "liters", "status": "normal"},
    {"id": 2, "depot_id": 2, "product": "LPG", "quantity": 4200, "unit": "liters", "status": "low"},
    {"id": 3, "depot_id": 3, "product": "LPG", "quantity": 7100, "unit": "liters", "status": "normal"},
    {"id": 4, "depot_id": 4, "product": "LPG", "quantity": 3800, "unit": "liters", "status": "low"},
]

@router.get("/")
def get_inventory(db: Session = Depends(get_db)):
    """Get all inventory records"""
    return mock_inventory

@router.get("/depot/{depot_id}")
def get_depot_inventory(depot_id: int, db: Session = Depends(get_db)):
    """Get inventory for specific depot"""
    depot_inv = next((inv for inv in mock_inventory if inv["depot_id"] == depot_id), None)
    if not depot_inv:
        return {"error": "Inventory not found for this depot"}
    return depot_inv

@router.get("/status/{status}")
def get_inventory_by_status(status: str, db: Session = Depends(get_db)):
    """Get inventory filtered by status (normal, low, critical)"""
    filtered = [inv for inv in mock_inventory if inv["status"] == status]
    return {"status": status, "count": len(filtered), "inventory": filtered}

@router.post("/")
def create_inventory(inventory: dict, db: Session = Depends(get_db)):
    """Create inventory record"""
    new_inv = {"id": max([inv["id"] for inv in mock_inventory]) + 1, **inventory}
    mock_inventory.append(new_inv)
    return new_inv

@router.patch("/{inv_id}")
def update_inventory(inv_id: int, quantity: float, db: Session = Depends(get_db)):
    """Update inventory quantity"""
    inv = next((i for i in mock_inventory if i["id"] == inv_id), None)
    if not inv:
        return {"error": "Inventory not found"}
    
    inv["quantity"] = quantity
    # Update status based on quantity
    if quantity < 3000:
        inv["status"] = "critical"
    elif quantity < 5000:
        inv["status"] = "low"
    else:
        inv["status"] = "normal"
    
    return inv
