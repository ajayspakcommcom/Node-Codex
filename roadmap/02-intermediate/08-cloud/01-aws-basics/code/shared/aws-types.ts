export interface WorkloadProfile {
  readonly name: string;
  readonly hasFileUploads: boolean;
  readonly needsRelationalData: boolean;
  readonly needsServerControl: boolean;
  readonly expectedTraffic: "steady" | "bursty";
  readonly complianceSensitivity: "low" | "medium" | "high";
  readonly globalUsers: boolean;
}

export interface CloudRecommendation {
  readonly compute: "EC2" | "Lambda" | "Container service";
  readonly objectStorage?: "S3";
  readonly database?: "RDS";
  readonly notes: readonly string[];
}

export interface ResponsibilityBoundary {
  readonly awsManaged: readonly string[];
  readonly teamOwned: readonly string[];
}

export interface RegionPlan {
  readonly regions: readonly string[];
  readonly multiAz: boolean;
  readonly reasoning: readonly string[];
}

export interface AdvisoryResult {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
