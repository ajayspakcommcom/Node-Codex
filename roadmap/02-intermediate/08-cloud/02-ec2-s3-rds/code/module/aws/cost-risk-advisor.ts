import type { AdvisoryResult, AwsWorkload } from "../../shared/aws-service-types.js";

export class CostRiskAdvisor {
  public assess(workload: AwsWorkload): AdvisoryResult {
    const findings: string[] = [];

    if (workload.needsServerControl) {
      findings.push("EC2 sizing and always-on capacity should be reviewed against expected usage.");
    }

    if (workload.hasUploads) {
      findings.push("S3 storage and transfer cost should be visible as asset volume grows.");
    }

    if (workload.relationalQueries) {
      findings.push("RDS instance sizing and storage growth can become meaningful cost drivers.");
    }

    return {
      riskLevel: findings.length >= 3 ? "medium" : findings.length >= 1 ? "low" : "low",
      findings,
    };
  }
}
