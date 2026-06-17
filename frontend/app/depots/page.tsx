"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Depot } from "@/types/depot";

export default function DepotsPage() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepots();
  }, []);

  const fetchDepots = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/depots");
      setDepots(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Depots fetch error:", err);
      setDepots([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "#4CAF50";
      case "alert":
        return "#FF9800";
      case "maintenance":
        return "#f44336";
      default:
        return "#999";
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading depots...</div>;

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🏭 Depot Management</h1>

      <div style={{ marginTop: 30 }}>
        <h2>All Depots ({depots.length})</h2>
        <div style={{ display: "grid", gap: 20 }}>
          {depots.length > 0 ? (
            depots.map((depot) => (
              <div
                key={depot.id}
                style={{
                  border: `3px solid ${getStatusColor(depot.status)}`,
                  padding: 20,
                  borderRadius: 8,
                  backgroundColor: "#fafafa",
                }}
              >
                <h3>{depot.name}</h3>
                <p><strong>Province:</strong> {depot.province}</p>
                <p><strong>Capacity:</strong> {depot.current_stock}L / {depot.max_capacity}L</p>
                <div style={{ width: "100%", height: 20, backgroundColor: "#e0e0e0", borderRadius: 4, overflow: "hidden", marginTop: 10 }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(depot.current_stock / depot.max_capacity) * 100}%`,
                      backgroundColor: getStatusColor(depot.status),
                    }}
                  />
                </div>
                <p style={{ marginTop: 10 }}>
                  <strong>Status:</strong>{" "}
                  <span style={{ color: getStatusColor(depot.status) }}>
                    {depot.status.toUpperCase()}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No depots available</p>
          )}
        </div>
      </div>
    </main>
  );
}
