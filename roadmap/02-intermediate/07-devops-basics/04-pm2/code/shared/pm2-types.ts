export interface Pm2AppConfig {
  readonly name: string;
  readonly script: string;
  readonly instances?: number | "max";
  readonly execMode?: "fork" | "cluster";
  readonly watch?: boolean;
  readonly autorestart?: boolean;
  readonly maxRestarts?: number;
  readonly env?: Readonly<Record<string, string>>;
  readonly envProduction?: Readonly<Record<string, string>>;
  readonly errorFile?: string;
  readonly outFile?: string;
}

export interface Pm2EcosystemSpec {
  readonly apps: readonly Pm2AppConfig[];
}

export interface AdvisoryResult {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
