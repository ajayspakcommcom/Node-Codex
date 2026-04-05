export interface TableStats {
  readonly tableName: string;
  readonly rowCount: number;
  readonly writeVolume: "low" | "medium" | "high";
}

export interface IndexDefinition {
  readonly name: string;
  readonly tableName: string;
  readonly columns: readonly string[];
  readonly includes?: readonly string[];
  readonly kind: "single" | "composite";
}

export interface QueryPattern {
  readonly name: string;
  readonly tableName: string;
  readonly filterColumns: readonly string[];
  readonly sortColumns: readonly string[];
  readonly projectedColumns: readonly string[];
  readonly joinColumns?: readonly string[];
}

export interface ExecutionPlanSummary {
  readonly queryName: string;
  readonly planType: "index-seek" | "index-scan" | "table-scan";
  readonly supportingIndex?: string;
  readonly reason: string;
}

export interface SelectivityProfile {
  readonly column: string;
  readonly distinctValueRatio: number;
  readonly note: string;
}
