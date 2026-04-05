export interface AbstractionFitInput {
  readonly workload: "crud-heavy" | "reporting-heavy" | "mixed";
  readonly teamStrength: "model-driven" | "query-tuning" | "balanced";
  readonly performanceSensitivity: "low" | "medium" | "high";
}

export class AbstractionFitAdvisor {
  public recommend(input: AbstractionFitInput): {
    readonly recommendation: "orm" | "query-builder" | "mixed";
    readonly reason: string;
  } {
    if (input.workload === "crud-heavy" && input.teamStrength === "model-driven" && input.performanceSensitivity !== "high") {
      return {
        recommendation: "orm",
        reason: "The workload is dominated by model-centric CRUD, so ORM productivity is likely worth the abstraction cost.",
      };
    }

    if (input.workload === "reporting-heavy" || (input.teamStrength === "query-tuning" && input.performanceSensitivity === "high")) {
      return {
        recommendation: "query-builder",
        reason: "The workload needs explicit query control, so a query builder is a better default fit.",
      };
    }

    return {
      recommendation: "mixed",
      reason: "The service has different workload shapes, so a bounded mixed approach is likely the most practical enterprise choice.",
    };
  }
}
