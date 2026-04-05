import type { AdvisoryResult, Pm2EcosystemSpec } from "../../shared/pm2-types.js";

export class ClusterModeAdvisor {
  public assess(spec: Pm2EcosystemSpec): AdvisoryResult {
    const findings: string[] = [];

    for (const app of spec.apps) {
      if (app.execMode === "cluster" && app.instances !== 1) {
        findings.push(
          `${app.name} uses cluster execution, so the application must tolerate multi-process behavior and shared-state boundaries.`,
        );
      }

      if (app.execMode === "cluster" && app.watch) {
        findings.push(`${app.name} combines cluster mode and watch mode, which is usually noisy and fragile.`);
      }
    }

    return {
      riskLevel: findings.length >= 2 ? "medium" : findings.length === 1 ? "low" : "low",
      findings,
    };
  }
}
