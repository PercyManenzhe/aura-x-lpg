"use client";

interface Depot {
  id: number;
  name: string;
  province: string;
  stock: number;
  capacity: number;
  status: "operational" | "maintenance" | "alert";
}

export default function DepotCard({ depot }: { depot: Depot }) {
  const stockPercentage = (depot.stock / depot.capacity) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "#10b981";
      case "maintenance":
        return "#f59e0b";
      case "alert":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{
      border: `2px solid ${getStatusColor(depot.status)}`,
      borderRadius: 8,
      padding: 20,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h3 style={{ margin: "0 0 5px 0" }}>{depot.name}</h3>
          <p style={{ margin: 0, color: "#6b7280" }}>{depot.province}</p>
        </div>
        <span style={{
          backgroundColor: getStatusColor(depot.status),
          color: "white",
          padding: "5px 10px",
          borderRadius: 4,
          fontSize: 12,
          textTransform: "uppercase"
        }}>
          {depot.status}
        </span>
      </div>

      <div style={{ marginTop: 15 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span>Stock Level</span>
          <span>{stockPercentage.toFixed(1)}%</span>
        </div>
        <div style={{
          backgroundColor: "#e5e7eb",
          height: 10,
          borderRadius: 5,
          overflow: "hidden"
        }}>
          <div style={{
            backgroundColor: getStatusColor(depot.status),
            height: "100%",
            width: `${Math.min(stockPercentage, 100)}%`,
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      <div style={{ marginTop: 15, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div>
          <p style={{ margin: "0 0 5px 0", color: "#6b7280", fontSize: 12 }}>Current</p>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: 16 }}>{depot.stock} L</p>
        </div>
        <div>
          <p style={{ margin: "0 0 5px 0", color: "#6b7280", fontSize: 12 }}>Capacity</p>
          <p style={{ margin: 0, fontWeight: "bold", fontSize: 16 }}>{depot.capacity} L</p>
        </div>
      </div>
    </div>
  );
}
