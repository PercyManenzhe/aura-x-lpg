"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Inventory } from "@/types/depot";

export default function InventoryPage() {
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/inventory");
      setInventory(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Inventory fetch error:", err);
      setInventory([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "#4CAF50";
      case "low":
        return "#FF9800";
      case "critical":
        return "#f44336";
      default:
        return "#999";
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading inventory...</div>;

  return (
    <main style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>📦 Inventory Management</h1>

      <div style={{ marginTop: 30 }}>
        <h2>LPG Stock Levels</h2>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: 12, textAlign: "left" }}>Depot ID</th>
                <th style={{ padding: 12, textAlign: "left" }}>Product</th>
                <th style={{ padding: 12, textAlign: "left" }}>Quantity (L)</th>
                <th style={{ padding: 12, textAlign: "left" }}>Reorder Level</th>
                <th style={{ padding: 12, textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.length > 0 ? (
                inventory.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: 12 }}>Depot {item.depot_id}</td>
                    <td style={{ padding: 12 }}>{item.product_type}</td>
                    <td style={{ padding: 12, fontWeight: "bold" }}>
                      {item.quantity.toLocaleString()}
                    </td>
                    <td style={{ padding: 12 }}>{item.reorder_level.toLocaleString()}</td>
                    <td style={{ padding: 12 }}>
                      <span
                        style={{
                          backgroundColor: getStatusColor(item.status),
                          color: "#fff",
                          padding: "5px 10px",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: 20, textAlign: "center", color: "#999" }}>
                    No inventory data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
