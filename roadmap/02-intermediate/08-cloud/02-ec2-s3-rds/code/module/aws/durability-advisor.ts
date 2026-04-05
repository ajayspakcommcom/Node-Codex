import type { AdvisoryResult, AwsWorkload } from "../../shared/aws-service-types.js";

export class DurabilityAdvisor {
  public assess(workload: AwsWorkload): AdvisoryResult {
    const findings: string[] = [];

    if (workload.hasUploads) {
      findings.push("S3 should be the durable boundary for file assets and exports.");
    }

    if (workload.relationalQueries) {
      findings.push("RDS durability and availability features still require intentional database architecture decisions.");
    }

    if (workload.storesUserAssetsOnDisk) {
      findings.push("EC2-local asset storage weakens durability and replacement safety.");
    }

    return {
      riskLevel: workload.storesUserAssetsOnDisk ? "high" : findings.length >= 2 ? "medium" : "low",
      findings,
    };
  }
}
