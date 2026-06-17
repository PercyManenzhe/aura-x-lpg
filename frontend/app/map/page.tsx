"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MapPage() {
  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/map");
      setMapData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Map fetch error:", err);
      setMapData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading map...</div>;

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🗺️ South Africa LPG Distribution Map</h1>

      <div style={{ marginTop: 30 }}>
        <h2>Active Locations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {mapData.length > 0 ? (
            mapData.map((location, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  padding: 20,
                  borderRadius: 8,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h3>{location.name}</h3>
                <p>
                  <strong>Province:</strong> {location.province}
                </p>
                <p>
                  <strong>Coordinates:</strong> {location.latitude?.toFixed(4)}, {location.longitude?.toFixed(4)}
                </p>
                <p>
                  <strong>Stock:</strong> {location.stock?.toLocaleString()}L
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
                        location.status === "operational"
                          ? "#4CAF50"
                          : location.status === "alert"
                          ? "#FF9800"
                          : "#f44336",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: 3,
                      fontSize: 12,
                    }}
                  >
                    {location.status?.toUpperCase()}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No map data available</p>
          )}
        </div>
      </div>

      <section style={{ marginTop: 40 }}>
        <h2>Coverage Statistics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          <StatCard
            title="Locations"
            value={mapData.length}
            color="#2196F3"
          />
          <StatCard
            title="Provinces"
            value={new Set(mapData.map((d) => d.province)).size}
            color="#4CAF50"
          />
          <StatCard
            title="Total Stock"
            value={`${(mapData.reduce((sum, d) => sum + (d.stock || 0), 0) / 1000).toFixed(1)}k L`}
            color="#FF9800"
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0, fontSize: 14 }}>{title}</p>
      <h2 style={{ margin: "10px 0 0 0", fontSize: 32 }}>{value}</h2>
    </div>
  );
}
