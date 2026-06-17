from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.services.route_engine import RouteEngine

router = APIRouter()
route_engine = RouteEngine()

# Mock map data with depot locations
map_data = [
    {"id": 1, "name": "Cape Town Depot", "province": "Western Cape", "stock": 8500, "status": "operational", "lat": -33.9249, "lon": 18.4241},
    {"id": 2, "name": "Durban Hub", "province": "KwaZulu-Natal", "stock": 4200, "status": "alert", "lat": -29.8587, "lon": 31.0192},
    {"id": 3, "name": "Johannesburg Terminal", "province": "Gauteng", "stock": 7100, "status": "operational", "lat": -26.2023, "lon": 28.0436},
    {"id": 4, "name": "Port Elizabeth Station", "province": "Eastern Cape", "stock": 3800, "status": "maintenance", "lat": -33.9669, "lon": 25.6007},
]

@router.get("/")
def get_map_data(db: Session = Depends(get_db)):
    """Get map data with all depots and tankers"""
    return {
        "depots": map_data,
        "map_bounds": {
            "north": -22.0,
            "south": -34.8,
            "east": 32.8,
            "west": 16.5
        },
        "center": {"lat": -28.8, "lon": 24.6}
    }

@router.get("/depots")
def get_depot_locations(db: Session = Depends(get_db)):
    """Get all depot locations for map"""
    return map_data

@router.get("/route")
def optimize_delivery_route(start_depot: int, delivery_depots: str, db: Session = Depends(get_db)):
    """Optimize route between depots
    
    Example: /route?start_depot=1&delivery_depots=2,3,4
    """
    delivery_list = [int(d.strip()) for d in delivery_depots.split(",")]
    route = route_engine.optimize_route(start_depot, delivery_list)
    return route

@router.get("/nearest")
def find_nearest_depot(lat: float, lon: float, db: Session = Depends(get_db)):
    """Find nearest depot from coordinates"""
    return route_engine.get_nearest_depot(lat, lon)

@router.get("/distance")
def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float, db: Session = Depends(get_db)):
    """Calculate distance between two coordinates"""
    distance = route_engine.calculate_distance(lat1, lon1, lat2, lon2)
    return {
        "from": {"lat": lat1, "lon": lon1},
        "to": {"lat": lat2, "lon": lon2},
        "distance_km": round(distance, 2)
    }