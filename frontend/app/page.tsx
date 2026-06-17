"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [dashboard, setDashboard] = useState<any>(null);
  const [live, setLive] = useState<any>(null);
  const [map, setMap] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboard();
    fetchMap();

    const interval = setInterval(() => {
      fetchLive();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/dashboard");
      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLive = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/live-feed");
      setLive(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMap = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/map");
      setMap(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>

      <h1>Aura-X LPG Command Centre</h1>

      {/* DASHBOARD */}
      <h2>National Overview</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Card title="Stock" value={dashboard?.national_stock} />
        <Card title="Tankers" value={dashboard?.active_tankers} />
        <Card title="Depots" value={dashboard?.depots} />
        <Card title="Alerts" value={dashboard?.alerts} />
      </div>

      {/* LIVE FEED */}
      <h2 style={{ marginTop: 30 }}>Live Feed</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Card title="Tank %" value={live?.tank_level} />
        <Card title="Pressure" value={live?.pressure} />
        <Card title="Temperature" value={live?.temperature} />
      </div>

      {/* MAP SECTION */}
      <h2 style={{ marginTop: 40 }}>South Africa LPG Map</h2>

      <div style={{ display: "grid", gap: 10 }}>
        {map.map((item, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 8
          }}>
            <strong>{item.name}</strong>
            <p>{item.province}</p>
            <p>Stock: {item.stock}</p>
            <p>Status: {item.status}</p>
          </div>
        ))}
      </div>

    </main>
  );
}

function Card({ title, value }: any) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 15,
      width: 150,
      borderRadius: 8
    }}>
      <h4>{title}</h4>
      <p style={{ fontSize: 20, fontWeight: "bold" }}>{value ?? "-"}</p>
    </div>
  );
}