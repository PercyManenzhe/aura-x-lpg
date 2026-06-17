from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
import random

router = APIRouter()

@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):
    """Get dashboard overview with national statistics"""
    return {
        "national_stock": round(random.uniform(50000, 100000), 2),
        "active_tankers": random.randint(3, 8),
        "depots": 4,
        "alerts": random.randint(0, 5),
        "stock_status": "stable",
        "avg_fill_level": round(random.uniform(60, 90), 1),
        "depots_with_alerts": random.randint(0, 2),
        "avg_demand_today": round(random.uniform(20000, 30000), 2)
    }
