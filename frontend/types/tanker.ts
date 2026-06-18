export interface Tanker {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  load: number;
  status: "active" | "idle" | "critical";
}
