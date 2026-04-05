import type { MaterializationAssessment } from "../../shared/aggregation-types.js";

export interface MaterializationInput {
  readonly requestFrequencyPerHour: number;
  readonly totalCostUnits: number;
  readonly freshnessToleranceMinutes: number;
}

export class MaterializationAdvisor {
  public assess(input: MaterializationInput): MaterializationAssessment {
    const repeatedCostPerHour = input.requestFrequencyPerHour * input.totalCostUnits;

    if (repeatedCostPerHour >= 2_500 && input.freshnessToleranceMinutes >= 5) {
      return {
        recommendation: "materialize",
        reason:
          "This summary is requested frequently enough, and the freshness tolerance is loose enough, that precomputation is likely a better operational choice.",
      };
    }

    return {
      recommendation: "keep-live",
      reason:
        "The pipeline cost or freshness requirement still supports computing this result live without obvious pressure to materialize it yet.",
    };
  }
}
