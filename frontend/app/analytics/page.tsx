"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const dashRes = await axios.get("http://127.0.0.1:8000/dashboard");
      const mapRes = await axios.get("http://127.0.0.1:8000/map");
      
      setAnalytics({
        dashboard: dashRes.data,
        locations: mapRes.data,
      });
    } catch (err) {
      console.error("Analytics fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading analytics...</div>;

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>📊 Analytics Dashboard</h1>

      <section style={{ marginTop: 30 }}>
        <h2>Key Metrics</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          <Card title="National Stock" value={analytics?.dashboard?.national_stock} unit="L" />
          <Card title="Active Tankers" value={analytics?.dashboard?.active_tankers} unit="units" />
          <Card title="Total Depots" value={analytics?.dashboard?.depots} unit="locations" />
          <Card title="Active Alerts" value={analytics?.dashboard?.alerts} unit="alerts" />
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Regional Distribution</h2>
        <div style={{ display: "grid", gap: 15 }}>
          {analytics?.locations?.map((location: any, idx: number) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                padding: 15,
                borderRadius: 8,
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{location.name}</h3>
              <p><strong>Province:</strong> {location.province}</p>
              <p><strong>Stock Level:</strong> {location.stock}L</p>
              <p><strong>Status:</strong> {location.status}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Card({ title, value, unit }: any) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 20,
        borderRadius: 8,
        textAlign: "center",
        backgroundColor: "#f0f8ff",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", fontSize: 14, color: "#666" }}>
        {title}
      </h3>
      <p style={{ margin: 0, fontSize: 24, fontWeight: "bold", color: "#333" }}>
        {value}
      </p>
      <p style={{ margin: "5px 0 0 0", fontSize: 12, color: "#999" }}>
        {unit}
      </p>
    </div>
  );
}
