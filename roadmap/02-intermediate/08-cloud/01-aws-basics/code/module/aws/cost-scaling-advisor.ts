import type { AdvisoryResult, WorkloadProfile } from "../../shared/aws-types.js";

export class CostScalingAdvisor {
  public assess(workload: WorkloadProfile): AdvisoryResult {
    const findings: string[] = [];

    if (workload.expectedTraffic === "bursty") {
      findings.push("Bursty workloads need cost-aware scaling choices so idle capacity does not dominate spend.");
    }

    if (workload.hasFileUploads) {
      findings.push("Object storage and transfer costs should be visible when file usage grows.");
    }

    if (workload.needsRelationalData) {
      findings.push("Managed database sizing and storage growth should be reviewed early instead of after traffic growth.");
    }

    return {
      riskLevel: findings.length >= 2 ? "medium" : findings.length === 1 ? "low" : "low",
      findings,
    };
  }
}
