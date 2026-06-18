import random
from fastapi import FastAPI

from app.api.map import router as map_router
from app.api.depots import router as depot_router

app = FastAPI(
    title="Aura-X LPG Platform",
    version="1.0.0"
)

# Register routers
app.include_router(map_router, prefix="/map", tags=["Map"])
app.include_router(depot_router, prefix="/depots", tags=["Depots"])


@app.get("/")
def home():
    return {
        "platform": "Aura-X LPG",
        "status": "Running"
    }


@app.get("/dashboard")
def dashboard():
    return {
        "national_stock": 124000,
        "active_tankers": 148,
        "depots": 4,
        "alerts": 3
    }


@app.get("/live-feed")
def live_feed():
    return {
        "tank_level": round(random.uniform(65, 95), 2),
        "pressure": round(random.uniform(10, 15), 2),
        "temperature": round(random.uniform(20, 35), 2)
    }


@app.get("/alerts")
def alerts():
    return [
        {
            "id": 1,
            "type": "Low Stock",
            "description": "Benoni LPG Hub stock below threshold",
            "status": "Pending",
            "created_at": "2026-06-17 10:00:00"
        },
        {
            "id": 2,
            "type": "High Pressure",
            "description": "Richards Bay tanker pressure above normal range",
            "status": "Resolved",
            "created_at": "2026-06-17 12:30:00"
        },
        {
            "id": 3,
            "type": "Temperature Alert",
            "description": "Venda Border LPG Hub temperature exceeded limit",
            "status": "Pending",
            "created_at": "2026-06-17 15:45:00"
        }
    ]
    