import type { AdvisoryResult } from "../../shared/aws-types.js";

export class IamBoundaryAdvisor {
  public assess(input: {
    readonly usesAdminPermissions: boolean;
    readonly rolesSeparatedByPurpose: boolean;
    readonly secretsScopedPerEnvironment: boolean;
  }): AdvisoryResult {
    const findings: string[] = [];

    if (input.usesAdminPermissions) {
      findings.push("Broad admin-style permissions weaken least-privilege boundaries.");
    }

    if (!input.rolesSeparatedByPurpose) {
      findings.push("IAM roles should be separated by workload purpose and trust boundary.");
    }

    if (!input.secretsScopedPerEnvironment) {
      findings.push("Secrets and access scopes should differ across environments instead of sharing one broad access pattern.");
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
