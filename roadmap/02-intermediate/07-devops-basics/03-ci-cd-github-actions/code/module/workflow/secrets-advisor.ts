import type { WorkflowSpec } from "../../shared/cicd-types.js";

export class SecretsAdvisor {
  public assess(spec: WorkflowSpec): {
    readonly requiredSecrets: readonly string[];
    readonly riskyStepPatterns: readonly string[];
  } {
    const riskyStepPatterns = spec.jobs.flatMap((job) =>
      job.steps
        .filter((step) => step.run?.includes("echo $") || step.run?.includes("TOKEN"))
        .map((step) => `${job.id}.${step.name}`),
    );

    return {
      requiredSecrets: spec.requiredSecrets ?? [],
      riskyStepPatterns,
    };
  }
}
