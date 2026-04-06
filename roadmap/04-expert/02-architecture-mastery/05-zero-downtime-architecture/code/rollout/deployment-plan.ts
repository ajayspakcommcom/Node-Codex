import {
  assertCompatibleRelease,
  assertRollbackSafe,
  type RuntimeEnvironment,
  type ServiceRelease,
} from "./compatibility-rules.js";

export interface DeploymentPlanInput {
  currentRelease: ServiceRelease;
  candidateRelease: ServiceRelease;
  runtime: RuntimeEnvironment;
}

export interface DeploymentStep {
  name: string;
  rationale: string;
}

export function buildDeploymentPlan(input: DeploymentPlanInput): readonly DeploymentStep[] {
  const { currentRelease, candidateRelease, runtime } = input;

  assertCompatibleRelease(candidateRelease, runtime);
  assertRollbackSafe(currentRelease, candidateRelease);

  return [
    {
      name: "expand-schema",
      rationale: "Introduce additive schema changes before shifting any application traffic.",
    },
    {
      name: "deploy-compatible-version",
      rationale: "Deploy the candidate while it still accepts old contracts and old schema state.",
    },
    {
      name: "shift-traffic",
      rationale: "Promote the candidate only after compatibility checks and readiness pass.",
    },
    {
      name: "drain-previous-version",
      rationale: "Stop new work on the previous version and wait for in-flight requests to complete.",
    },
    {
      name: "contract-schema",
      rationale: "Remove deprecated schema or compatibility logic only after old instances are gone.",
    },
  ] as const;
}
