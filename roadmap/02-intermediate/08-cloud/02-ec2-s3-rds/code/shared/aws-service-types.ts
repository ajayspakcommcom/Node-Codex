export interface AwsWorkload {
  readonly name: string;
  readonly hasUploads: boolean;
  readonly relationalQueries: boolean;
  readonly needsServerControl: boolean;
  readonly trafficShape: "steady" | "bursty";
  readonly storesUserAssetsOnDisk?: boolean;
}

export interface ServiceFit {
  readonly ec2: boolean;
  readonly s3: boolean;
  readonly rds: boolean;
  readonly reasoning: readonly string[];
}

export interface AdvisoryResult {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
