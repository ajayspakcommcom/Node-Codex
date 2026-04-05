import type { AdvisoryResult, Pm2EcosystemSpec } from "../../shared/pm2-types.js";

export class RestartPolicyAdvisor {
  public assess(spec: Pm2EcosystemSpec): AdvisoryResult {
    const findings: string[] = [];

    for (const app of spec.apps) {
      if (app.autorestart !== true) {
        findings.push(`${app.name} does not explicitly enable restart supervision.`);
      }

      if ((app.maxRestarts ?? 0) > 20) {
        findings.push(`${app.name} has a very high restart limit, which can hide crash-loop problems.`);
      }

      if (app.watch) {
        findings.push(`${app.name} enables file watching, which is usually a poor fit for production-like PM2 usage.`);
      }
    }

    return {
      riskLevel: findings.length >= 3 ? "high" : findings.length >= 1 ? "medium" : "low",
      findings,
    };
  }
}
