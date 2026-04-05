import type { AdvisoryResult, Pm2EcosystemSpec } from "../../shared/pm2-types.js";

export class RuntimeVisibilityAdvisor {
  public assess(spec: Pm2EcosystemSpec): AdvisoryResult {
    const findings: string[] = [];

    for (const app of spec.apps) {
      if (!app.errorFile || !app.outFile) {
        findings.push(`${app.name} does not define both stdout and stderr log destinations.`);
      }
    }

    return {
      riskLevel: findings.length >= 1 ? "medium" : "low",
      findings,
    };
  }
}
