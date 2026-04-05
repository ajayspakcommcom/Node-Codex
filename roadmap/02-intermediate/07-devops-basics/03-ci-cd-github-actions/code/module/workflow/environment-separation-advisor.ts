import type { WorkflowSpec } from "../../shared/cicd-types.js";

export class EnvironmentSeparationAdvisor {
  public summarize(spec: WorkflowSpec): {
    readonly environments: readonly string[];
    readonly recommendation: string;
  } {
    const environments = spec.jobs
      .map((job) => job.environment)
      .filter((environment): environment is string => environment !== undefined);

    return {
      environments,
      recommendation:
        environments.length > 0
          ? "Validation and environment-targeted jobs are separated, which improves release clarity."
          : "Consider separating validation jobs from environment-specific deployment jobs.",
    };
  }
}
