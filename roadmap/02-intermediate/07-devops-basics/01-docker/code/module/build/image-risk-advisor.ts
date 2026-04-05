import type { DockerProjectSpec, ImageRiskAssessment } from "../../shared/docker-types.js";

export class ImageRiskAdvisor {
  public assess(spec: DockerProjectSpec): ImageRiskAssessment {
    const findings: string[] = [];

    if (!spec.usesNonRootUser) {
      findings.push("Container runs without a non-root user strategy.");
    }

    if (!spec.injectsSecretsAtRuntime) {
      findings.push("Image appears to bake secrets or volatile configuration directly into the container.");
    }

    if (!spec.buildInputsPinned) {
      findings.push("Build inputs are not pinned, which weakens reproducibility.");
    }

    if (spec.stages.some((stage) => stage.baseImage.includes(":latest"))) {
      findings.push("Using `latest` increases unpredictability in future builds.");
    }

    return {
      riskLevel: findings.length >= 3 ? "high" : findings.length >= 1 ? "medium" : "low",
      findings,
    };
  }
}
