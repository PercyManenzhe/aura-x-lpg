from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.demand_engine import DemandEngine

router = APIRouter()
demand_engine = DemandEngine()

@router.get("/daily/{depot_id}")
def forecast_daily(depot_id: int, db: Session = Depends(get_db)):
    """Get daily demand forecast for a depot"""
    return demand_engine.forecast_daily_demand(depot_id)

@router.get("/weekly/{depot_id}")
def forecast_weekly(depot_id: int, db: Session = Depends(get_db)):
    """Get weekly demand forecast for a depot"""
    return demand_engine.forecast_weekly_demand(depot_id)

@router.get("/all")
def forecast_all_depots(db: Session = Depends(get_db)):
    """Get forecasts for all depots"""
    depot_ids = [1, 2, 3, 4]
    forecasts = [demand_engine.forecast_daily_demand(depot_id) for depot_id in depot_ids]
    return {
        "forecasts": forecasts,
        "generated_at": "now",
        "model": "demand_engine_v1"
    }

@router.get("/alerts/{depot_id}")
def get_demand_alerts(depot_id: int, current_stock: float = 5000, db: Session = Depends(get_db)):
    """Get alerts based on demand forecast"""
    forecast = demand_engine.forecast_daily_demand(depot_id)
    alerts = demand_engine.get_demand_alerts(current_stock, forecast["forecasted_demand"])
    return {
        "depot_id": depot_id,
        "current_stock": current_stock,
        "forecasted_demand": forecast["forecasted_demand"],
        "alerts": alerts
    }
