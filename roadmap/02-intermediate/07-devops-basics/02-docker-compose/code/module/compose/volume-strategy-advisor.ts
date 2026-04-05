import type { ComposeSpec, VolumeAssessment } from "../../shared/compose-types.js";

export class VolumeStrategyAdvisor {
  public assess(spec: ComposeSpec): VolumeAssessment {
    const findings: string[] = [];

    if ((spec.namedVolumes?.length ?? 0) === 0) {
      findings.push("No named volume strategy is declared, so state handling may be unclear.");
    }

    for (const service of spec.services) {
      if ((service.name === "mongo" || service.name === "redis") && !(service.volumes?.length)) {
        findings.push(`${service.name} has no explicit volume strategy for local persistence or reset control.`);
      }
    }

    return {
      persistenceRisk: findings.length >= 2 ? "high" : findings.length === 1 ? "medium" : "low",
      findings,
    };
  }
}
