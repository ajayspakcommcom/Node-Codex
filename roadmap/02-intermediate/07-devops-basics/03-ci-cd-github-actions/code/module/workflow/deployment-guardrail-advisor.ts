import type { GateAssessment, WorkflowSpec } from "../../shared/cicd-types.js";

export class DeploymentGuardrailAdvisor {
  public assess(spec: WorkflowSpec): GateAssessment {
    const findings: string[] = [];
    const hasDeployJob = spec.jobs.some((job) => job.id.includes("deploy"));

    if (hasDeployJob && !spec.jobs.some((job) => (job.needs?.length ?? 0) > 0)) {
      findings.push("Deployment flow lacks explicit upstream validation dependencies.");
    }

    if (hasDeployJob && !spec.jobs.some((job) => job.environment === "production")) {
      findings.push("Deployment flow has no explicit environment boundary.");
    }

    if (Object.values(spec.on).some((branches) => branches.includes("*"))) {
      findings.push("Wildcard triggers increase the chance of unsafe or noisy deployment behavior.");
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
