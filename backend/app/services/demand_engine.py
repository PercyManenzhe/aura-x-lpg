from datetime import datetime, timedelta
import random

class DemandEngine:
    """Forecasts LPG demand based on historical patterns and trends"""
    
    def __init__(self):
        self.base_demand = 5000  # liters per day baseline
        self.seasonal_factor = 1.2  # winter increase
        
    def forecast_daily_demand(self, depot_id: int) -> dict:
        """Forecast demand for the next 24 hours"""
        # Mock forecast
        today = datetime.now()
        demand = self.base_demand * self.seasonal_factor + random.uniform(-500, 500)
        
        return {
            "depot_id": depot_id,
            "forecasted_demand": round(demand, 2),
            "confidence": 0.87,
            "forecast_date": today.isoformat(),
            "forecast_horizon": "24h"
        }
    
    def forecast_weekly_demand(self, depot_id: int) -> dict:
        """Forecast demand for the next 7 days"""
        weekly_demand = self.base_demand * 7 * self.seasonal_factor
        daily_breakdown = [
            round(self.base_demand * self.seasonal_factor * (1 + random.uniform(-0.2, 0.2)), 2)
            for _ in range(7)
        ]
        
        return {
            "depot_id": depot_id,
            "total_weekly_forecast": round(weekly_demand, 2),
            "daily_breakdown": daily_breakdown,
            "confidence": 0.82,
            "trend": "stable"
        }
    
    def get_demand_alerts(self, current_stock: float, forecast: float) -> list:
        """Generate alerts if stock won't meet forecasted demand"""
        alerts = []
        if current_stock < forecast:
            shortage = forecast - current_stock
            alerts.append({
                "severity": "critical" if shortage > forecast * 0.3 else "warning",
                "message": f"Insufficient stock. Shortage: {shortage} L",
                "recommended_action": "Request immediate resupply"
            })
        return alerts
