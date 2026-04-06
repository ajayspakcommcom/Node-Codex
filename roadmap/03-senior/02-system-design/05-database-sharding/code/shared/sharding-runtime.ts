import {
  QueryPattern,
  RebalancingEvent,
  ShardKeyCandidate,
  ShardNode,
} from "./sharding-types.js";

export const shardNodes: ShardNode[] = [
  {
    id: "shard-a",
    rangeOrBucket: "tenant-buckets-0-99",
    tenantCount: 180,
    writeLoad: 0.88,
    readLoad: 0.72,
  },
  {
    id: "shard-b",
    rangeOrBucket: "tenant-buckets-100-199",
    tenantCount: 110,
    writeLoad: 0.46,
    readLoad: 0.39,
  },
  {
    id: "shard-c",
    rangeOrBucket: "tenant-buckets-200-299",
    tenantCount: 95,
    writeLoad: 0.34,
    readLoad: 0.28,
  },
];

export const shardKeyCandidates: ShardKeyCandidate[] = [
  {
    name: "tenantId",
    distributionPredictability: "medium",
    routingSimplicity: "high",
    hotspotRisk: "medium",
    notes: ["Good for tenant isolation", "Large tenants may create hotspot shards"],
  },
  {
    name: "createdAt",
    distributionPredictability: "low",
    routingSimplicity: "medium",
    hotspotRisk: "high",
    notes: ["Time-based writes can pile onto the newest partition"],
  },
  {
    name: "hashedUserId",
    distributionPredictability: "high",
    routingSimplicity: "medium",
    hotspotRisk: "low",
    notes: ["Better spread", "More complex range-style reporting paths"],
  },
];

export const queryPatterns: QueryPattern[] = [
  {
    description: "Fetch tenant orders by tenantId",
    usesShardKey: true,
    requiresCrossShardFanout: false,
  },
  {
    description: "Global revenue report across all tenants",
    usesShardKey: false,
    requiresCrossShardFanout: true,
  },
  {
    description: "User profile lookup by hashed user id",
    usesShardKey: true,
    requiresCrossShardFanout: false,
  },
];

export const rebalancingEvents: RebalancingEvent[] = [
  {
    sourceShard: "shard-a",
    targetShard: "shard-c",
    movedPartitions: 12,
    riskLevel: "high",
  },
];
