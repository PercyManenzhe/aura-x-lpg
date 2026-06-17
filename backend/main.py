import random
from fastapi import FastAPI

from app.api.map import router as map_router
from app.api.depots import router as depot_router

app = FastAPI(
    title="Aura-X LPG Platform",
    version="1.0.0"
)

# Register routers (ONLY ONCE, AFTER app is created)
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