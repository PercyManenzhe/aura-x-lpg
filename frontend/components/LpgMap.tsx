"use client";

import { useEffect, useState } from "react";

interface MapLocation {
  name: string;
  province: string;
  stock: number;
  status: "operational" | "alert" | "maintenance";
}

export default function LpgMap() {
  const [locations, setLocations] = useState<MapLocation[]>([]);

  useEffect(() => {
    // Mock data - would normally fetch from backend
    setLocations([
      { name: "Cape Town Depot", province: "Western Cape", stock: 8500, status: "operational" },
      { name: "Durban Hub", province: "KwaZulu-Natal", stock: 4200, status: "alert" },
      { name: "Johannesburg Terminal", province: "Gauteng", stock: 7100, status: "operational" },
      { name: "Port Elizabeth Station", province: "Eastern Cape", stock: 3800, status: "maintenance" },
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "#10b981";
      case "alert":
        return "#ef4444";
      case "maintenance":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{
      backgroundColor: "#f0f9ff",
      border: "1px solid #bfdbfe",
      borderRadius: 8,
      padding: 20
    }}>
      <h2>South Africa LPG Distribution Map</h2>
      
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 15,
        marginTop: 20
      }}>
        {locations.map((location, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              border: `2px solid ${getStatusColor(location.status)}`,
              borderRadius: 6,
              padding: 15,
              display: "flex",
              flexDirection: "column",
              gap: 10
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <h4 style={{ margin: 0 }}>{location.name}</h4>
                <p style={{ margin: "5px 0 0 0", color: "#6b7280", fontSize: 12 }}>
                  {location.province}
                </p>
              </div>
              <span
                style={{
                  backgroundColor: getStatusColor(location.status),
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: 3,
                  fontSize: 10,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {location.status}
              </span>
            </div>
            <div style={{
              backgroundColor: "#f3f4f6",
              padding: 10,
              borderRadius: 4,
              textAlign: "center"
            }}>
              <p style={{ margin: 0, color: "#6b7280", fontSize: 12 }}>Current Stock</p>
              <p style={{ margin: "5px 0 0 0", fontWeight: "bold", fontSize: 18 }}>
                {location.stock} L
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}