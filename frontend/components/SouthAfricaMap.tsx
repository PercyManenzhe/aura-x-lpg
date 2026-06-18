"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, CircleMarker } from "react-leaflet";

// Fixed: Swapped to absolute path root shortcuts to instantly clear TypeScript resolution errors
import { liveTrackingService } from "@/services/api";
import { Depot, Tanker } from "@/types/depot";

export default function SouthAfricaMap() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [tankers, setTankers] = useState<Tanker[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveTrackingData = async () => {
    try {
      const depotData = await liveTrackingService.getDepots();
      const tankerData = await liveTrackingService.getTankers();
      
      setDepots(Array.isArray(depotData) ? depotData : []);
      setTankers(Array.isArray(tankerData) ? tankerData : []);
    } catch (error) {
      console.error("Failed to sync live logistics monitoring:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveTrackingData();
    const interval = setInterval(fetchLiveTrackingData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center", fontWeight: 500, fontFamily: "sans-serif", color: "#4b5563" }}>
        Syncing live South African transit network...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "500px", position: "relative" }}>
      <MapContainer
        center={[-28.479, 24.672]} 
        zoom={5.5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Live Depots Layer */}
        {depots.map((depot) => {
          // Fixed status key lookup mapping options: operational, alert, maintenance
          const statusColors: Record<string, string> = { 
            operational: "#22c55e", 
            alert: "#ef4444", 
            maintenance: "#eab308" 
          };
          const markerColor = statusColors[String(depot.status).toLowerCase()] || "#3b82f6";
          
          // Fixed: Adjusted tracking pointers to match your depot.ts schema keys exactly
          const latitude = depot.latitude !== undefined ? depot.latitude : 0;
          const longitude = depot.longitude !== undefined ? depot.longitude : 0;

          const stockValue = Number(depot.current_stock || 0);
          const capacityValue = Number(depot.max_capacity || 1);
          const fillPercentage = Math.min((stockValue / capacityValue) * 100, 100);

          return (
            <CircleMarker
              key={`depot-${depot.id}`}
              center={[latitude, longitude]}
              radius={14}
              pathOptions={{
                fillColor: markerColor,
                color: "#ffffff",
                weight: 2,
                fillOpacity: 0.85,
              }}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif", minWidth: "160px" }}>
                  <h3 style={{ fontWeight: "bold", fontSize: "14px", margin: "0 0 2px 0" }}>{depot.name || "Unnamed Hub"}</h3>
                  <p style={{ fontSize: "11px", margin: "0 0 6px 0", color: "#6b7280" }}>Province: {depot.province || "N/A"}</p>
                  <p style={{ fontSize: "12px", margin: "4px 0", color: "#4b5563" }}>
                    Status: <span style={{ textTransform: "capitalize", fontWeight: "600", color: markerColor }}>{String(depot.status)}</span>
                  </p>
                  <div style={{ width: "100%", backgroundColor: "#e5e7eb", borderRadius: "9999px", height: "8px", marginTop: "8px" }}>
                    <div 
                      style={{ 
                        backgroundColor: "#2563eb", 
                        height: "8px", 
                        borderRadius: "9999px",
                        width: `${fillPercentage}%` 
                      }}
                    />
                  </div>
                  <p style={{ fontSize: "10px", textAlign: "right", margin: "4px 0 0 0", color: "#6b7280" }}>
                    {stockValue.toLocaleString()} / {capacityValue.toLocaleString()} L
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Live Active Tankers Layer */}
        {tankers.map((tanker) => {
          // Fixed: Adjusted tracking pointers to match your tanker schema keys exactly
          const tankerLat = tanker.latitude !== undefined ? tanker.latitude : 0;
          const tankerLng = tanker.longitude !== undefined ? tanker.longitude : 0;

          return (
            <CircleMarker
              key={`tanker-${tanker.id}`}
              center={[tankerLat, tankerLng]}
              radius={8}
              pathOptions={{
                fillColor: "#1d4ed8", 
                color: "#ffffff",
                weight: 1.5,
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <div style={{ fontFamily: "sans-serif", minWidth: "150px" }}>
                  <h4 style={{ fontWeight: "bold", fontSize: "14px", margin: "0 0 2px 0", color: "#1e3a8a" }}>🚚 {tanker.name || "Unknown Tanker"}</h4>
                  <p style={{ fontSize: "11px", margin: "0 0 4px 0", color: "#6b7280" }}>Location: {tanker.current_location || "In Transit"}</p>
                  <p style={{ fontSize: "12px", margin: "4px 0", color: "#4b5563" }}>
                    <strong>Load:</strong> {Number(tanker.current_load || 0).toLocaleString()} / {Number(tanker.capacity || 0).toLocaleString()} L
                  </p>
                  <p style={{ fontSize: "12px", margin: "2px 0", color: "#6b7280" }}>
                    Status: <span style={{ color: tanker.status === "active" ? "#16a34a" : "#f59e0b", fontWeight: "600" }}>{tanker.status}</span>
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
