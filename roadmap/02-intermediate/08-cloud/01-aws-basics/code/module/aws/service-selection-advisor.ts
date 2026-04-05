import type { CloudRecommendation, WorkloadProfile } from "../../shared/aws-types.js";

export class ServiceSelectionAdvisor {
  public recommend(workload: WorkloadProfile): CloudRecommendation {
    const notes: string[] = [];

    const compute: CloudRecommendation["compute"] = workload.needsServerControl
      ? "EC2"
      : workload.expectedTraffic === "bursty"
        ? "Lambda"
        : "Container service";

    if (workload.hasFileUploads) {
      notes.push("Use S3 for durable object storage instead of app-server disks.");
    }

    if (workload.needsRelationalData) {
      notes.push("Use RDS when relational data and managed database operations are a good fit.");
    }

    if (workload.complianceSensitivity === "high") {
      notes.push("High-sensitivity workloads need explicit IAM, networking, and audit controls.");
    }

    return {
      compute,
      objectStorage: workload.hasFileUploads ? "S3" : undefined,
      database: workload.needsRelationalData ? "RDS" : undefined,
      notes,
    };
  }
}
