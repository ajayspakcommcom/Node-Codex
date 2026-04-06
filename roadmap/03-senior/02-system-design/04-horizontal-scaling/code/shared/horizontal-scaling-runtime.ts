import {
  ReplicaNode,
  ScalingSignal,
  SharedDependency,
  WorkItem,
} from "./horizontal-scaling-types.js";

export const replicas: ReplicaNode[] = [
  {
    id: "api-1",
    requestsPerSecond: 420,
    cpuSaturation: 0.44,
    memorySaturation: 0.52,
    hasLocalSessionState: false,
  },
  {
    id: "api-2",
    requestsPerSecond: 395,
    cpuSaturation: 0.39,
    memorySaturation: 0.48,
    hasLocalSessionState: false,
  },
  {
    id: "api-3",
    requestsPerSecond: 405,
    cpuSaturation: 0.41,
    memorySaturation: 0.5,
    hasLocalSessionState: true,
  },
];

export const sharedDependencies: SharedDependency[] = [
  {
    name: "primary-mongodb",
    kind: "database",
    utilization: 0.91,
    p95LatencyMs: 145,
  },
  {
    name: "redis-cache",
    kind: "cache",
    utilization: 0.57,
    p95LatencyMs: 11,
  },
  {
    name: "job-queue",
    kind: "queue",
    utilization: 0.63,
    p95LatencyMs: 18,
  },
];

export const workItems: WorkItem[] = [
  { id: "job-1", tenantId: "tenant-a", requiresIdempotency: true },
  { id: "job-2", tenantId: "tenant-a", requiresIdempotency: true },
  { id: "job-3", tenantId: "tenant-b", requiresIdempotency: false },
];

export const scalingSignals: ScalingSignal[] = [
  { name: "cpu", value: 0.84, trustworthy: true },
  { name: "request-rate", value: 6200, trustworthy: true },
  { name: "queue-lag", value: 190, trustworthy: true },
  { name: "average-latency", value: 62, trustworthy: false },
];
