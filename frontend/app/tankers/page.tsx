"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tanker } from "@/types/depot";

export default function TankersPage() {
  const [tankers, setTankers] = useState<Tanker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTankers();
  }, []);

  const fetchTankers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/tankers");
      setTankers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Tankers fetch error:", err);
      setTankers([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "idle":
        return "#2196F3";
      case "maintenance":
        return "#f44336";
      default:
        return "#999";
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading tankers...</div>;

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🚛 Tanker Fleet Management</h1>

      <div style={{ marginTop: 30 }}>
        <h2>Active Fleet ({tankers.length})</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {tankers.length > 0 ? (
            tankers.map((tanker) => (
              <div
                key={tanker.id}
                style={{
                  border: `2px solid ${getStatusColor(tanker.status)}`,
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                }}
              >
                <h3>{tanker.name}</h3>
                <p>
                  <strong>Location:</strong> {tanker.current_location}
                </p>
                <p>
                  <strong>Capacity:</strong> {tanker.capacity}L
                </p>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                  <strong>Load Level</strong>
                  <div style={{ width: "100%", height: 15, backgroundColor: "#e0e0e0", borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(tanker.current_load / tanker.capacity) * 100}%`,
                        backgroundColor: getStatusColor(tanker.status),
                      }}
                    />
                  </div>
                  <p style={{ margin: "5px 0 0 0", fontSize: 12 }}>
                    {tanker.current_load}L / {tanker.capacity}L
                  </p>
                </div>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor: getStatusColor(tanker.status),
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: 3,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {tanker.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No tankers available</p>
          )}
        </div>
      </div>
    </main>
  );
}
