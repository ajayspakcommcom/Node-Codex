import type { AdvisoryResult, AwsWorkload } from "../../shared/aws-service-types.js";

export class DatabaseFitAdvisor {
  public assess(workload: AwsWorkload): AdvisoryResult {
    const findings: string[] = [];

    if (workload.relationalQueries) {
      findings.push("RDS is a strong fit when the workload depends on managed relational storage.");
    } else {
      findings.push("If relational querying is not a real need, RDS may be unnecessary complexity.");
    }

    return {
      riskLevel: workload.relationalQueries ? "low" : "medium",
      findings,
    };
  }
}
