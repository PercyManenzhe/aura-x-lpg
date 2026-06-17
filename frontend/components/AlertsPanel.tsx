"use client";

import { useEffect, useState } from "react";

interface Alert {
  id: number;
  message: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
}

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Mock alerts data
    setAlerts([
      {
        id: 1,
        message: "Low stock at Durban Depot",
        severity: "critical",
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        id: 2,
        message: "Tanker TK-001 maintenance due",
        severity: "warning",
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        id: 3,
        message: "System update completed",
        severity: "info",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "#ef4444";
      case "warning":
        return "#f59e0b";
      case "info":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{
      backgroundColor: "#f9fafb",
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: 20,
      marginTop: 30
    }}>
      <h2>Alerts & Notifications</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              borderLeft: `4px solid ${getSeverityColor(alert.severity)}`,
              backgroundColor: "white",
              padding: 15,
              borderRadius: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div>
              <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>{alert.message}</p>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>{alert.timestamp}</p>
            </div>
            <span style={{
              backgroundColor: getSeverityColor(alert.severity),
              color: "white",
              padding: "5px 10px",
              borderRadius: 4,
              fontSize: 12,
              textTransform: "uppercase"
            }}>
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
