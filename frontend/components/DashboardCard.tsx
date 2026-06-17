export default function DashboardCard({title, value}: any) {
  return (
    <div className="border rounded p-4">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}