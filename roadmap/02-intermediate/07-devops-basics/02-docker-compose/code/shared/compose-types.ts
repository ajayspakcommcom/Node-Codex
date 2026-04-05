export interface ComposeService {
  readonly name: string;
  readonly image?: string;
  readonly buildContext?: string;
  readonly command?: readonly string[];
  readonly ports?: readonly string[];
  readonly environment?: Readonly<Record<string, string>>;
  readonly dependsOn?: readonly string[];
  readonly volumes?: readonly string[];
  readonly networks?: readonly string[];
  readonly readinessSignal?: "healthcheck" | "startup_only" | "none";
}

export interface ComposeSpec {
  readonly projectName: string;
  readonly services: readonly ComposeService[];
  readonly namedVolumes?: readonly string[];
  readonly networks?: readonly string[];
}

export interface DependencyAssessment {
  readonly readinessRisk: "low" | "medium" | "high";
  readonly findings: readonly string[];
}

export interface VolumeAssessment {
  readonly persistenceRisk: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
