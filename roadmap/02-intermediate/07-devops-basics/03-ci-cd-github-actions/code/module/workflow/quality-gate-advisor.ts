import type { GateAssessment, WorkflowSpec } from "../../shared/cicd-types.js";

export class QualityGateAdvisor {
  public assess(spec: WorkflowSpec): GateAssessment {
    const findings: string[] = [];
    const jobIds = spec.jobs.map((job) => job.id);

    if (!jobIds.includes("lint")) {
      findings.push("Pipeline has no explicit lint or static validation stage.");
    }

    if (!jobIds.some((jobId) => jobId.includes("test"))) {
      findings.push("Pipeline has no explicit automated test stage.");
    }

    if (spec.producesArtifacts && !jobIds.some((jobId) => jobId.includes("build") || jobId.includes("validate"))) {
      findings.push("Pipeline claims delivery confidence without a clear build or package stage.");
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
