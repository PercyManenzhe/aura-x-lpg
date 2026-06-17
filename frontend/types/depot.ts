export interface Depot {
  id: number;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  current_stock: number;
  max_capacity: number;
  status: "operational" | "alert" | "maintenance";
}

export interface Tanker {
  id: number;
  name: string;
  capacity: number;
  current_load: number;
  current_location: string;
  latitude: number;
  longitude: number;
  status: "active" | "idle" | "maintenance";
  last_updated: string;
}

export interface Inventory {
  id: number;
  depot_id: number;
  product_type: string;
  quantity: number;
  reorder_level: number;
  status: "normal" | "low" | "critical";
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "manager" | "user";
  is_active: boolean;
}

export interface LiveFeed {
  tank_level: number;
  pressure: number;
  temperature: number;
}

export interface DashboardData {
  national_stock: number;
  active_tankers: number;
  depots: number;
  alerts: number;
}
