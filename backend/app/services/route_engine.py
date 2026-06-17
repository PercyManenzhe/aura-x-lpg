from typing import List, Dict
import math

class RouteEngine:
    """Optimizes delivery routes for tankers"""
    
    def __init__(self):
        # Mock depot coordinates (lat, lon)
        self.depots = {
            1: {"name": "Cape Town", "lat": -33.9249, "lon": 18.4241},
            2: {"name": "Durban", "lat": -29.8587, "lon": 31.0192},
            3: {"name": "Johannesburg", "lat": -26.2023, "lon": 28.0436},
            4: {"name": "Port Elizabeth", "lat": -33.9669, "lon": 25.6007},
        }
    
    def calculate_distance(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculate distance between two coordinates (Haversine formula)"""
        R = 6371  # Earth radius in km
        lat_diff = math.radians(lat2 - lat1)
        lon_diff = math.radians(lon2 - lon1)
        
        a = math.sin(lat_diff/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(lon_diff/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        
        return R * c
    
    def optimize_route(self, start_depot_id: int, delivery_depots: List[int]) -> Dict:
        """Optimize delivery route using nearest neighbor algorithm"""
        if not delivery_depots or start_depot_id not in self.depots:
            return {"error": "Invalid depot IDs"}
        
        start = self.depots[start_depot_id]
        route = [start_depot_id]
        unvisited = set(delivery_depots)
        total_distance = 0
        current_lat, current_lon = start["lat"], start["lon"]
        
        # Nearest neighbor algorithm
        while unvisited:
            nearest_id = min(
                unvisited,
                key=lambda d: self.calculate_distance(
                    current_lat, current_lon,
                    self.depots[d]["lat"], self.depots[d]["lon"]
                )
            )
            
            distance = self.calculate_distance(
                current_lat, current_lon,
                self.depots[nearest_id]["lat"], self.depots[nearest_id]["lon"]
            )
            
            total_distance += distance
            route.append(nearest_id)
            current_lat = self.depots[nearest_id]["lat"]
            current_lon = self.depots[nearest_id]["lon"]
            unvisited.remove(nearest_id)
        
        # Return to start
        total_distance += self.calculate_distance(
            current_lat, current_lon,
            start["lat"], start["lon"]
        )
        
        return {
            "route": route,
            "total_distance_km": round(total_distance, 2),
            "estimated_time_hours": round(total_distance / 80, 2),  # 80 km/h avg speed
            "depot_sequence": [self.depots[d]["name"] for d in route]
        }
    
    def get_nearest_depot(self, lat: float, lon: float, available_depots: List[int] = None) -> Dict:
        """Find nearest depot from given coordinates"""
        if available_depots is None:
            available_depots = list(self.depots.keys())
        
        nearest = min(
            available_depots,
            key=lambda d: self.calculate_distance(lat, lon, self.depots[d]["lat"], self.depots[d]["lon"])
        )
        
        distance = self.calculate_distance(
            lat, lon,
            self.depots[nearest]["lat"], self.depots[nearest]["lon"]
        )
        
        return {
            "nearest_depot_id": nearest,
            "depot_name": self.depots[nearest]["name"],
            "distance_km": round(distance, 2)
        }
