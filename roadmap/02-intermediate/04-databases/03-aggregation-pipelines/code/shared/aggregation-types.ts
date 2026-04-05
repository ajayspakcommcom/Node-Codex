export type DocumentValue = string | number | boolean | null | DocumentValue[] | { [key: string]: DocumentValue };

export interface AggregationDocument {
  readonly [key: string]: unknown;
}

export interface OrderRecord {
  readonly id: string;
  readonly tenantId: string;
  readonly createdAt: string;
  readonly status: "placed" | "cancelled" | "refunded";
  readonly customerId: string;
  readonly productId: string;
  readonly category: "laptops" | "audio" | "accessories";
  readonly salesChannel: "web" | "mobile" | "partner";
  readonly region: "IN" | "US" | "EU";
  readonly units: number;
  readonly totalInCents: number;
}

export interface ProductRecord {
  readonly id: string;
  readonly name: string;
  readonly category: "laptops" | "audio" | "accessories";
  readonly active: boolean;
}

export interface CustomerRecord {
  readonly id: string;
  readonly tenantId: string;
  readonly tier: "standard" | "gold" | "enterprise";
}

export interface ProductTagRecord {
  readonly productId: string;
  readonly tag: string;
}

export interface StageMetric {
  readonly name: string;
  readonly kind: string;
  readonly inputCount: number;
  readonly outputCount: number;
  readonly averageOutputFieldCount: number;
  readonly estimatedCostUnits: number;
  readonly note: string;
}

export interface PipelineRunResult {
  readonly pipelineName: string;
  readonly output: readonly AggregationDocument[];
  readonly stageMetrics: readonly StageMetric[];
  readonly totalCostUnits: number;
}

export interface MaterializationAssessment {
  readonly recommendation: "keep-live" | "materialize";
  readonly reason: string;
}
