export interface AppConfig {
  readonly environment: "local" | "staging" | "production";
  readonly port: number;
  readonly databaseUrl: string;
  readonly redisUrl?: string;
  readonly jwtSecret?: string;
  readonly logLevel: "debug" | "info" | "warn" | "error";
}

export interface ValidationResult {
  readonly ok: boolean;
  readonly errors: readonly string[];
}

export interface DriftAssessment {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
