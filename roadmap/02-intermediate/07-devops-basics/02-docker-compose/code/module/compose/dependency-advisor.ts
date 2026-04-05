import type { ComposeSpec, DependencyAssessment } from "../../shared/compose-types.js";

export class DependencyAdvisor {
  public assess(spec: ComposeSpec): DependencyAssessment {
    const findings: string[] = [];

    for (const service of spec.services) {
      if ((service.dependsOn?.length ?? 0) > 0 && service.readinessSignal !== "healthcheck") {
        findings.push(
          `${service.name} depends on other services but does not model readiness with health-aware behavior.`,
        );
      }
    }

    return {
      readinessRisk: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
