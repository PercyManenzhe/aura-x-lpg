from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
import random
from datetime import datetime

router = APIRouter()

@router.get("/")
def get_live_feed(db: Session = Depends(get_db)):
    """Get live data feed from sensors/tankers"""
    return {
        "timestamp": datetime.now().isoformat(),
        "tank_level": round(random.uniform(70, 95), 1),
        "pressure": round(random.uniform(40, 60), 1),
        "temperature": round(random.uniform(15, 30), 1),
        "active_tankers": random.randint(2, 6),
        "deliveries_today": random.randint(3, 8),
        "system_status": "operational"
    }

@router.get("/tanker/{tanker_id}")
def get_tanker_feed(tanker_id: int, db: Session = Depends(get_db)):
    """Get live data for specific tanker"""
    return {
        "tanker_id": tanker_id,
        "timestamp": datetime.now().isoformat(),
        "current_load": round(random.uniform(2000, 5000), 2),
        "speed_kmh": round(random.uniform(60, 100), 1),
        "pressure": round(random.uniform(40, 60), 1),
        "temperature": round(random.uniform(10, 35), 1),
        "status": "in_transit"
    }

@router.get("/depot/{depot_id}")
def get_depot_feed(depot_id: int, db: Session = Depends(get_db)):
    """Get live data for specific depot"""
    return {
        "depot_id": depot_id,
        "timestamp": datetime.now().isoformat(),
        "current_stock": round(random.uniform(3000, 9000), 2),
        "inflow_rate": round(random.uniform(100, 500), 2),
        "outflow_rate": round(random.uniform(200, 600), 2),
        "pressure": round(random.uniform(40, 60), 1),
        "temperature": round(random.uniform(15, 30), 1),
        "pump_status": "running" if random.random() > 0.3 else "idle"
    }

@router.get("/alerts")
def get_live_alerts(db: Session = Depends(get_db)):
    """Get real-time alerts"""
    alerts = [
        {"id": 1, "type": "LOW_STOCK", "depot": "Durban Hub", "severity": "warning", "message": "Stock below 50%"},
        {"id": 2, "type": "MAINTENANCE_DUE", "tanker": "TK-003", "severity": "info", "message": "Maintenance scheduled"},
    ] if random.random() > 0.5 else []
    
    return {
        "timestamp": datetime.now().isoformat(),
        "alert_count": len(alerts),
        "alerts": alerts
    }
