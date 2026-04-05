import type { AdvisoryResult, AwsWorkload } from "../../shared/aws-service-types.js";

export class StorageBoundaryAdvisor {
  public assess(workload: AwsWorkload): AdvisoryResult {
    const findings: string[] = [];

    if (workload.hasUploads) {
      findings.push("Uploaded files belong in durable object storage such as S3, not on instance disks.");
    }

    if (workload.storesUserAssetsOnDisk) {
      findings.push("Application instance disks are a risky durability boundary for user assets.");
    }

    return {
      riskLevel: workload.storesUserAssetsOnDisk ? "high" : findings.length > 0 ? "low" : "low",
      findings,
    };
  }
}
