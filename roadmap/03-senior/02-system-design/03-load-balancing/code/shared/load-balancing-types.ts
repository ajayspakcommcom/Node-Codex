export interface BackendNode {
  id: string;
  zone: string;
  weight: number;
  activeConnections: number;
  healthy: boolean;
  avgLatencyMs: number;
  sessionLoad: number;
}

export interface TrafficRequest {
  requestId: string;
  sessionId?: string;
  estimatedCost: "light" | "medium" | "heavy";
  preferredZone?: string;
}

export interface HealthCheckResult {
  nodeId: string;
  healthy: boolean;
  reason: string;
}

export interface DistributionSnapshot {
  totalRequests: number;
  perNodeAssignments: Record<string, number>;
  hotspotRisk: "low" | "medium" | "high";
}
