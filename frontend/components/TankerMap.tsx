"use client";

import { useEffect, useState } from "react";

interface Tanker {
  id: string;
  name: string;
  location: string;
  capacity: number;
  current_load: number;
  status: "active" | "idle" | "maintenance";
}

export default function TankerMap() {
  const [tankers, setTankers] = useState<Tanker[]>([]);

  useEffect(() => {
    // Mock tanker data
    setTankers([
      {
        id: "TK-001",
        name: "Tanker Alpha",
        location: "Cape Town",
        capacity: 5000,
        current_load: 4200,
        status: "active",
      },
      {
        id: "TK-002",
        name: "Tanker Beta",
        location: "Durban",
        capacity: 5000,
        current_load: 2100,
        status: "active",
      },
      {
        id: "TK-003",
        name: "Tanker Gamma",
        location: "Johannesburg",
        capacity: 5000,
        current_load: 0,
        status: "idle",
      },
      {
        id: "TK-004",
        name: "Tanker Delta",
        location: "Port Elizabeth",
        capacity: 5000,
        current_load: 1500,
        status: "maintenance",
      },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#0ea5e9";
      case "idle":
        return "#94a3b8";
      case "maintenance":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getLoadPercentage = (current: number, capacity: number) => {
    return (current / capacity) * 100;
  };

  return (
    <div style={{
      backgroundColor: "#f8fafc",
      border: "1px solid #cbd5e1",
      borderRadius: 8,
      padding: 20,
      marginTop: 30
    }}>
      <h2>Fleet Tracking</h2>
      
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 15
      }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            <th style={{ textAlign: "left", padding: 12, fontWeight: "bold" }}>Tanker</th>
            <th style={{ textAlign: "left", padding: 12, fontWeight: "bold" }}>Location</th>
            <th style={{ textAlign: "left", padding: 12, fontWeight: "bold" }}>Load Status</th>
            <th style={{ textAlign: "left", padding: 12, fontWeight: "bold" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {tankers.map((tanker) => (
            <tr key={tanker.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: 12, fontWeight: "bold" }}>{tanker.name}</td>
              <td style={{ padding: 12, color: "#475569" }}>{tanker.location}</td>
              <td style={{ padding: 12 }}>
                <div style={{ width: 150 }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                    fontSize: 12
                  }}>
                    <span>{getLoadPercentage(tanker.current_load, tanker.capacity).toFixed(0)}%</span>
                    <span>{tanker.current_load}/{tanker.capacity}L</span>
                  </div>
                  <div style={{
                    backgroundColor: "#e2e8f0",
                    height: 8,
                    borderRadius: 4,
                    overflow: "hidden"
                  }}>
                    <div
                      style={{
                        backgroundColor: getStatusColor(tanker.status),
                        height: "100%",
                        width: `${getLoadPercentage(tanker.current_load, tanker.capacity)}%`,
                        transition: "width 0.3s ease"
                      }}
                    />
                  </div>
                </div>
              </td>
              <td style={{ padding: 12 }}>
                <span style={{
                  backgroundColor: getStatusColor(tanker.status),
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 4,
                  fontSize: 12,
                  textTransform: "uppercase",
                  fontWeight: "bold"
                }}>
                  {tanker.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
