"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

// Dynamically import Leaflet map to prevent Next.js SSR build errors
const SouthAfricaMap = dynamic(
  () => import("../../components/SouthAfricaMap"),
  { 
    ssr: false, 
    loading: () => <div style={{ height: "100%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>Initializing Live Satellites...</div> 
  }
);

export default function MapPage() {
  const [mapData, setMapData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showHelp, setShowHelp] = useState(true);
  
  // NEW: Client mounting gate state to safely suppress hydration mismatches
  const [isMounted, setIsMounted] = useState(false);

  // Poll API every 5 seconds for live state telemetry updates
  useEffect(() => {
    setIsMounted(true); // Signal that client hydration is complete
    fetchMapData();
    const liveInterval = setInterval(fetchMapData, 5000);
    return () => clearInterval(liveInterval);
  }, []);

  const fetchMapData = async () => {
    try {
      const res = await axios.get("http://127.0.0");
      setMapData(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch live asset telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter left sidebar nodes based on search bar text
  const filteredData = mapData.filter((location) =>
    location.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fallback structural rendering block until client safely attaches
  if (!isMounted) {
    return <div style={{ padding: "30px", fontFamily: "Segoe UI, Arial", color: "#4b5563" }}>Syncing secure terminal link...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Segoe UI, Arial, sans-serif", backgroundColor: "#f4f5f7", overflow: "hidden" }}>
      
      {/* TOP NAVIGATION METRIC BAR */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", backgroundColor: "#ffffff", borderBottom: "1px solid #d1d5db", height: "55px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3a8a", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#dc2626" }}>◆</span> Aura-X LPG
          </span>
        </div>
        <div style={{ display: "flex", gap: "25px", fontSize: "13px", fontWeight: "600", color: "#4b5563" }}>
          <span style={{ color: "#2563eb", borderBottom: "2px solid #2563eb", paddingBottom: "17px", cursor: "pointer" }}>🛰️ Monitoring</span>
          <span style={{ cursor: "pointer" }}>🛣️ Routes</span>
          <span style={{ cursor: "pointer" }}>📊 Storages</span>
          <span style={{ cursor: "pointer" }}>⚙️ Settings</span>
          <span style={{ cursor: "pointer" }}>💬 Support</span>
          <span style={{ cursor: "pointer" }}>📡 Live Feed ({mapData.length})</span>
          <span style={{ cursor: "pointer" }}>🚚 Tankers ({mapData.length})</span>
          <span style={{ cursor: "pointer" }}>⚠️ Shortages ({mapData.filter(d => d.status === "critical" || d.status === "alert").length})</span>
        </div>
        <div style={{ fontSize: "13px", color: "#374151", fontWeight: "500" }}>
          👤 Operator: <strong>Percy Manenzhe</strong>
        </div>
      </header>

      {/* CORE WORKSPACE SECTION */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        
        {/* LEFT SIDEBAR: MANAGEMENT CONTROL PANEL */}
        <aside style={{ width: "320px", backgroundColor: "#ffffff", borderRight: "1px solid #d1d5db", display: "flex", flexDirection: "column", zIndex: 10 }}>
          
          {/* TAB SYSTEM */}
          <div style={{ display: "flex", borderBottom: "1px solid #e5e7eb", fontSize: "13px" }}>
            <div style={{ flex: 1, textAlign: "center", padding: "12px", fontWeight: "bold", borderBottom: "2px solid #2563eb", color: "#2563eb", cursor: "pointer" }}>Geofences</div>
            <div style={{ flex: 1, textAlign: "center", padding: "12px", color: "#6b7280", cursor: "pointer" }}>Groups</div>
          </div>

          {/* SEARCH AND STRUCTURAL ACTION ACTIONS */}
          <div style={{ padding: "12px", borderBottom: "1px solid #e5e7eb", backgroundColor: "#f9fafb" }}>
            <input
              type="text"
              placeholder="🔍 Search live depot or hub..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* ASSET NODES FEED LIST CONTAINER */}
          <div style={{ flex: 1, overflowY: "auto", fontSize: "13px" }}>
            {filteredData.length > 0 ? (
              filteredData.map((location, idx) => (
                <div
                  key={location.id || idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderBottom: "1px solid #f3f4f6",
                    backgroundColor: idx % 2 === 0 ? "#ffffff" : "#f9fafb",
                    cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <input type="checkbox" defaultChecked style={{ cursor: "pointer" }} />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: "600", color: "#111827", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                        {location.name}
                      </p>
                      <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#6b7280" }}>
                        {location.province || "South Africa"} • {location.current_stock?.toLocaleString() || 0}L
                      </p>
                    </div>
                  </div>
                  
                  {/* LIVE STATUS GRAPHICAL CHIPS */}
                  <span
                    style={{
                      backgroundColor:
                        location.status === "operational" || location.status === "green"
                          ? "#10b981"
                          : location.status === "alert" || location.status === "yellow"
                          ? "#f59e0b"
                          : "#ef4444",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {(location.status || "LIVE").toUpperCase()}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontStyle: "italic" }}>
                {loading ? "Syncing channels..." : "No tracking nodes match criteria."}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT FULL SCREEN VIEWPORT CONTAINER */}
        <section style={{ flex: 1, position: "relative", height: "100%" }}>
          
          {/* MAP CANVAS INJECTION LAYER */}
          <div style={{ width: "100%", height: "100%" }}>
            <SouthAfricaMap />
          </div>

          {/* HUD FLOATING HELP BANNER OVERLAY */}
          {showHelp && (
            <div style={{ position: "absolute", top: "20px", right: "20px", width: "320px", backgroundColor: "rgba(255, 255, 255, 0.96)", border: "1px solid #cbd5e1", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", padding: "14px", zIndex: 1000, fontSize: "12px", lineHeight: "1.5", color: "#334155" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", borderBottom: "1px solid #e2e8f0", paddingBottom: "6px" }}>
                <span style={{ fontWeight: "bold", fontSize: "13px", color: "#0f172a" }}>ℹ️ Live Telemetry Help</span>
                <span style={{ cursor: "pointer", fontWeight: "bold", color: "#94a3b8" }} onClick={() => setShowHelp(false)}>✕</span>
              </div>
              <p style={{ margin: "0 0 6px 0" }}>• Hover over circular markers to review real-time depot volumes.</p>
              <p style={{ margin: "0 0 6px 0" }}>• Active delivery tankers refresh coordinates dynamically.</p>
              <p style={{ margin: "0" }}>• Critical regions highlighted in red reflect instant supply shortages.</p>
            </div>
          )}

          {/* LOWER RUNTIME TELEMETRY SYSTEM FOOTER */}
          <footer style={{ position: "absolute", bottom: "0", left: "0", right: "0", height: "30px", backgroundColor: "rgba(255,255,255,0.9)", borderTop: "1px solid #cbd5e1", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 15px", fontSize: "11px", color: "#475569" }}>
            <div>© fleetdata systems division • live state node connection</div>
            <div style={{ fontWeight: "600" }}>System Status: Operational (05s loop)</div>
          </footer>

        </section>
      </div>
    
    </div>
  );
}
