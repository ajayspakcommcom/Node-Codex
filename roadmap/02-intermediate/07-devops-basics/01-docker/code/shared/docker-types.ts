export interface DockerStage {
  readonly name?: string;
  readonly baseImage: string;
  readonly workdir?: string;
  readonly copyInstructions: readonly string[];
  readonly runInstructions: readonly string[];
  readonly env?: Readonly<Record<string, string>>;
  readonly command?: readonly string[];
}

export interface DockerProjectSpec {
  readonly projectName: string;
  readonly exposedPort: number;
  readonly stages: readonly DockerStage[];
  readonly dockerignoreEntries: readonly string[];
  readonly usesNonRootUser: boolean;
  readonly injectsSecretsAtRuntime: boolean;
  readonly buildInputsPinned: boolean;
}

export interface LayerAssessment {
  readonly rebuildRisk: "low" | "medium" | "high";
  readonly cacheAdvice: readonly string[];
}

export interface ImageRiskAssessment {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
