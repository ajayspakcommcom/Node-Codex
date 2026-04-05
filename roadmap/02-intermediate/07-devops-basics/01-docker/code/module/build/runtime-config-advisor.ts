import type { DockerProjectSpec } from "../../shared/docker-types.js";

export class RuntimeConfigAdvisor {
  public summarize(spec: DockerProjectSpec): {
    readonly hasExplicitCommand: boolean;
    readonly envKeys: readonly string[];
    readonly recommendation: string;
  } {
    const runtimeStage = spec.stages.at(-1);
    const envKeys = runtimeStage?.env ? Object.keys(runtimeStage.env) : [];

    return {
      hasExplicitCommand: runtimeStage?.command !== undefined,
      envKeys,
      recommendation: spec.injectsSecretsAtRuntime
        ? "Runtime config is separated from the image, which is the safer default."
        : "Move secrets and volatile configuration out of the image and inject them at runtime.",
    };
  }
}
