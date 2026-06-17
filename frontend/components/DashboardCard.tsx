"use client";

export default function DashboardCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div style={{
      border: "1px solid #e5e7eb",
      borderRadius: 8,
      padding: 20,
      backgroundColor: "white",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <h4 style={{
        margin: "0 0 10px 0",
        color: "#6b7280",
        fontSize: 14,
        fontWeight: 500,
        textTransform: "uppercase"
      }}>
        {title}
      </h4>
      <h2 style={{
        margin: 0,
        fontSize: 32,
        fontWeight: "bold",
        color: "#1f2937"
      }}>
        {value ?? "-"}
      </h2>
    </div>
  );
}