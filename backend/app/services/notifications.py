from datetime import datetime
from typing import List, Dict

class NotificationService:
    """Handles notifications for critical events"""
    
    def __init__(self):
        self.notification_log = []
    
    def create_alert(self, alert_type: str, message: str, severity: str, depot_id: int = None) -> dict:
        """Create a notification alert"""
        notification = {
            "id": len(self.notification_log) + 1,
            "type": alert_type,
            "message": message,
            "severity": severity,  # critical, warning, info
            "depot_id": depot_id,
            "created_at": datetime.now().isoformat(),
            "read": False
        }
        self.notification_log.append(notification)
        return notification
    
    def get_alerts(self, severity: str = None, unread_only: bool = False) -> List[Dict]:
        """Retrieve alerts with optional filtering"""
        alerts = self.notification_log
        
        if severity:
            alerts = [a for a in alerts if a["severity"] == severity]
        if unread_only:
            alerts = [a for a in alerts if not a["read"]]
        
        return sorted(alerts, key=lambda x: x["created_at"], reverse=True)
    
    def mark_as_read(self, notification_id: int) -> bool:
        """Mark notification as read"""
        for notification in self.notification_log:
            if notification["id"] == notification_id:
                notification["read"] = True
                return True
        return False
    
    def notify_low_stock(self, depot_name: str, current: float, threshold: float, depot_id: int):
        """Alert when stock falls below threshold"""
        return self.create_alert(
            alert_type="LOW_STOCK",
            message=f"{depot_name}: Stock at {current}L, below threshold {threshold}L",
            severity="warning",
            depot_id=depot_id
        )
    
    def notify_critical_shortage(self, depot_name: str, depot_id: int):
        """Alert for critical shortage"""
        return self.create_alert(
            alert_type="CRITICAL_SHORTAGE",
            message=f"CRITICAL: {depot_name} has critically low stock!",
            severity="critical",
            depot_id=depot_id
        )
    
    def notify_tanker_available(self, tanker_name: str, destination: str):
        """Alert when tanker becomes available"""
        return self.create_alert(
            alert_type="TANKER_AVAILABLE",
            message=f"Tanker {tanker_name} available for delivery to {destination}",
            severity="info"
        )
