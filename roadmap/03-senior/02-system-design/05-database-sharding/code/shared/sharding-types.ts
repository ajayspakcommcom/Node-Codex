export interface ShardNode {
  id: string;
  rangeOrBucket: string;
  tenantCount: number;
  writeLoad: number;
  readLoad: number;
}

export interface ShardKeyCandidate {
  name: string;
  distributionPredictability: "low" | "medium" | "high";
  routingSimplicity: "low" | "medium" | "high";
  hotspotRisk: "low" | "medium" | "high";
  notes: string[];
}

export interface QueryPattern {
  description: string;
  usesShardKey: boolean;
  requiresCrossShardFanout: boolean;
}

export interface RebalancingEvent {
  sourceShard: string;
  targetShard: string;
  movedPartitions: number;
  riskLevel: "low" | "medium" | "high";
}
