export interface WorkflowStep {
  readonly name: string;
  readonly uses?: string;
  readonly run?: string;
}

export interface WorkflowJob {
  readonly id: string;
  readonly runsOn: string;
  readonly needs?: readonly string[];
  readonly environment?: string;
  readonly steps: readonly WorkflowStep[];
}

export interface WorkflowSpec {
  readonly name: string;
  readonly on: Readonly<Record<string, readonly string[]>>;
  readonly jobs: readonly WorkflowJob[];
  readonly requiredSecrets?: readonly string[];
  readonly producesArtifacts?: boolean;
}

export interface GateAssessment {
  readonly riskLevel: "low" | "medium" | "high";
  readonly findings: readonly string[];
}
