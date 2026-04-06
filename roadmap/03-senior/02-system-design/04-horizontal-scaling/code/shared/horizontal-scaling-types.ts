export interface ReplicaNode {
  id: string;
  requestsPerSecond: number;
  cpuSaturation: number;
  memorySaturation: number;
  hasLocalSessionState: boolean;
}

export interface SharedDependency {
  name: string;
  kind: "database" | "cache" | "queue" | "lock-service";
  utilization: number;
  p95LatencyMs: number;
}

export interface WorkItem {
  id: string;
  tenantId: string;
  requiresIdempotency: boolean;
}

export interface ScalingSignal {
  name: string;
  value: number;
  trustworthy: boolean;
}
