import type { EnvironmentConfig } from "../../shared/test-db-types.js";

export class EnvironmentStrategyAdvisor {
  public recommend(config: EnvironmentConfig): string {
    if (config.kind === "in-memory") {
      return "Useful for fast repository-focused tests, but not enough when behavior depends on real database features.";
    }

    return "Prefer for CI and higher-confidence persistence tests where schema setup and environment reproducibility matter.";
  }
}
