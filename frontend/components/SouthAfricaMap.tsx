"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function SouthAfricaMap() {
  return (
    <MapContainer
      center={[-29.0, 24.0]}
      zoom={5}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[-26.2041, 28.0473]}>
        <Popup>Benoni LPG Depot</Popup>
      </Marker>

      <Marker position={[-28.7830, 32.0377]}>
        <Popup>Richards Bay LPG Depot</Popup>
      </Marker>

      <Marker position={[-22.9456, 30.4853]}>
        <Popup>Venda Border Hub</Popup>
      </Marker>

      <Marker position={[-25.7884, 31.0530]}>
        <Popup>Barberton LPG Hub</Popup>
      </Marker>

    </MapContainer>
  );
}