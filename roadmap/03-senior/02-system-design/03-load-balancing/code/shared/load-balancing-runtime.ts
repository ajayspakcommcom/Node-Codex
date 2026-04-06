import { BackendNode, TrafficRequest } from "./load-balancing-types.js";

export const backendNodes: BackendNode[] = [
  {
    id: "node-a",
    zone: "ap-south-1a",
    weight: 3,
    activeConnections: 18,
    healthy: true,
    avgLatencyMs: 42,
    sessionLoad: 11,
  },
  {
    id: "node-b",
    zone: "ap-south-1a",
    weight: 2,
    activeConnections: 12,
    healthy: true,
    avgLatencyMs: 39,
    sessionLoad: 7,
  },
  {
    id: "node-c",
    zone: "ap-south-1b",
    weight: 1,
    activeConnections: 34,
    healthy: false,
    avgLatencyMs: 135,
    sessionLoad: 18,
  },
];

export const requestBurst: TrafficRequest[] = [
  { requestId: "r-1", estimatedCost: "light", sessionId: "s-101", preferredZone: "ap-south-1a" },
  { requestId: "r-2", estimatedCost: "heavy", sessionId: "s-102", preferredZone: "ap-south-1a" },
  { requestId: "r-3", estimatedCost: "medium", sessionId: "s-103", preferredZone: "ap-south-1b" },
  { requestId: "r-4", estimatedCost: "heavy", sessionId: "s-101", preferredZone: "ap-south-1a" },
];
