import type { AdvisoryResult, AwsWorkload, ServiceFit } from "../../shared/aws-service-types.js";

export class ComputeFitAdvisor {
  public recommend(workload: AwsWorkload): ServiceFit {
    const reasoning: string[] = [];

    if (workload.needsServerControl) {
      reasoning.push("EC2 is a reasonable fit when the team needs explicit server-level control.");
    } else {
      reasoning.push("If server control is not needed, EC2 may be heavier than necessary for the workload.");
    }

    if (workload.trafficShape === "bursty") {
      reasoning.push("Bursty traffic should trigger a deeper review of scaling and idle-cost tradeoffs.");
    }

    return {
      ec2: workload.needsServerControl,
      s3: workload.hasUploads,
      rds: workload.relationalQueries,
      reasoning,
    };
  }

  public assessRisk(workload: AwsWorkload): AdvisoryResult {
    const findings: string[] = [];

    if (!workload.needsServerControl) {
      findings.push("This workload may not justify the operational responsibility that comes with EC2.");
    }

    if (workload.trafficShape === "bursty") {
      findings.push("Bursty traffic can make fixed compute capacity less cost-efficient.");
    }

    return {
      riskLevel: findings.length >= 2 ? "medium" : findings.length === 1 ? "low" : "low",
      findings,
    };
  }
}
