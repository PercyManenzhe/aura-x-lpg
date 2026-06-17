"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#1a1a1a",
      color: "white",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "2px solid #0ea5e9"
    }}>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>
        🛢️ Aura-X LPG
      </div>
      <div style={{ display: "flex", gap: 30 }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link href="/inventory" style={{ color: "white", textDecoration: "none" }}>
          Inventory
        </Link>
        <Link href="/depots" style={{ color: "white", textDecoration: "none" }}>
          Depots
        </Link>
        <Link href="/map" style={{ color: "white", textDecoration: "none" }}>
          Map
        </Link>
        <Link href="/analytics" style={{ color: "white", textDecoration: "none" }}>
          Analytics
        </Link>
      </div>
    </nav>
  );
}
