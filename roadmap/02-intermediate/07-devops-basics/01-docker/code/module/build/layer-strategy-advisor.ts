import type { DockerProjectSpec, LayerAssessment } from "../../shared/docker-types.js";

export class LayerStrategyAdvisor {
  public assess(spec: DockerProjectSpec): LayerAssessment {
    const cacheAdvice: string[] = [];
    let highRiskSignals = 0;

    for (const stage of spec.stages) {
      if (stage.copyInstructions.some((instruction) => instruction.trim() === ". .")) {
        highRiskSignals += 1;
        cacheAdvice.push("Avoid copying the full repository before dependency installation.");
      }

      if (stage.runInstructions.some((instruction) => instruction.includes("npm install"))) {
        highRiskSignals += 1;
        cacheAdvice.push("Prefer pinned installs such as `npm ci` for reproducible dependency layers.");
      }
    }

    if (spec.stages.length === 1) {
      cacheAdvice.push("Consider a multi-stage build when build-time tooling does not belong in the runtime image.");
    }

    return {
      rebuildRisk: highRiskSignals >= 2 ? "high" : highRiskSignals === 1 ? "medium" : "low",
      cacheAdvice,
    };
  }
}
