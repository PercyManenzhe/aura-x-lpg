import axios from "axios";
import { Depot, Tanker } from "../types/depot";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const liveTrackingService = {
  getDepots: async (): Promise<Depot[]> => {
    try {
      const res = await api.get("/depots");
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.warn("Backend /depots offline, using schema-accurate mock data:", error);
      return [
        {
          id: 1,
          name: "Benoni LPG Hub",
          province: "Gauteng",
          latitude: -26.188,
          longitude: 28.320,
          current_stock: 32000,
          max_capacity: 40000,
          status: "operational"
        },
        {
          id: 2,
          name: "Richards Bay Terminal",
          province: "KwaZulu-Natal",
          latitude: -28.780,
          longitude: 32.037,
          current_stock: 8500,
          max_capacity: 50000,
          status: "alert"
        }
      ];
    }
  },

  getTankers: async (): Promise<Tanker[]> => {
    try {
      const res = await api.get("/tankers");
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      console.warn("Backend /tankers offline, using schema-accurate mock data:", error);
      return [
        {
          id: 1,
          name: "TK-001 (N3 Corridor)",
          capacity: 50000,
          current_load: 42000,
          current_location: "Harrismith Bypass",
          latitude: -28.272,
          longitude: 29.124,
          status: "active",
          last_updated: "Just Now"
        }
      ];
    }
  }
};
