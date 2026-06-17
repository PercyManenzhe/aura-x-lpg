from datetime import datetime
from typing import List, Dict

class ShortageEngine:
    """Detects and manages stock shortages across depots"""
    
    def __init__(self):
        self.reorder_threshold = 0.30  # Reorder when stock < 30% of capacity
        self.critical_threshold = 0.15  # Critical alert when < 15% of capacity
        self.shortage_log = []
    
    def check_shortage(self, depot_id: int, current_stock: float, max_capacity: float) -> Dict:
        """Check if depot has shortage and return status"""
        stock_percentage = (current_stock / max_capacity) * 100
        
        status = "normal"
        if stock_percentage < self.critical_threshold * 100:
            status = "critical"
        elif stock_percentage < self.reorder_threshold * 100:
            status = "low"
        
        return {
            "depot_id": depot_id,
            "current_stock": current_stock,
            "max_capacity": max_capacity,
            "stock_percentage": round(stock_percentage, 2),
            "status": status,
            "reorder_required": status in ["low", "critical"]
        }
    
    def get_all_shortages(self, depots_data: List[Dict]) -> List[Dict]:
        """Get all depots with shortages"""
        shortages = []
        
        for depot in depots_data:
            check = self.check_shortage(
                depot.get("id"),
                depot.get("current_stock", 0),
                depot.get("max_capacity", 10000)
            )
            
            if check["reorder_required"]:
                shortages.append(check)
        
        return sorted(shortages, key=lambda x: x["stock_percentage"])
    
    def calculate_required_stock(self, daily_demand: float, lead_time_days: int, safety_stock_days: int = 3) -> float:
        """Calculate required stock level to prevent shortage"""
        reorder_point = daily_demand * (lead_time_days + safety_stock_days)
        return round(reorder_point, 2)
    
    def recommend_resupply(self, depot_id: int, current_stock: float, daily_demand: float, capacity: float) -> Dict:
        """Recommend resupply quantity"""
        days_remaining = current_stock / daily_demand if daily_demand > 0 else 0
        optimal_resupply = capacity * 0.85  # Resupply to 85% of capacity
        quantity_needed = max(0, optimal_resupply - current_stock)
        
        return {
            "depot_id": depot_id,
            "current_stock": current_stock,
            "days_remaining": round(days_remaining, 2),
            "recommended_resupply_quantity": round(quantity_needed, 2),
            "target_stock_level": round(optimal_resupply, 2),
            "urgency": "critical" if days_remaining < 2 else "high" if days_remaining < 5 else "normal"
        }
    
    def log_shortage_event(self, depot_id: int, event_type: str, details: str):
        """Log shortage events for analytics"""
        event = {
            "timestamp": datetime.now().isoformat(),
            "depot_id": depot_id,
            "event_type": event_type,
            "details": details
        }
        self.shortage_log.append(event)
        return event
