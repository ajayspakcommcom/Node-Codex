import type { AdvisoryResult, Pm2EcosystemSpec } from "../../shared/pm2-types.js";

export class DeploymentFitAdvisor {
  public assess(spec: Pm2EcosystemSpec): AdvisoryResult {
    const findings: string[] = [];

    for (const app of spec.apps) {
      if (app.env && Object.keys(app.env).some((key) => /SECRET|PASSWORD|TOKEN/.test(key))) {
        findings.push(`${app.name} keeps sensitive configuration directly in versioned PM2 config.`);
      }

      if (app.watch) {
        findings.push(`${app.name} looks tuned for local reload behavior more than stable server supervision.`);
      }
    }

    return {
      riskLevel: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
