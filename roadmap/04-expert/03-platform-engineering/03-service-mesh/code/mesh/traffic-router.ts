export interface WeightedTrafficInput {
  stableWeightPercent: number;
  candidateWeightPercent: number;
}

export interface WeightedTrafficPlan {
  stableWeightPercent: number;
  candidateWeightPercent: number;
}

export class WeightedTrafficRouter {
  public constructor(private readonly input: WeightedTrafficInput) {
    const total = input.stableWeightPercent + input.candidateWeightPercent;
    if (total !== 100) {
      throw new Error("Traffic weights must sum to 100");
    }
  }

  public plan(): WeightedTrafficPlan {
    return {
      stableWeightPercent: this.input.stableWeightPercent,
      candidateWeightPercent: this.input.candidateWeightPercent,
    };
  }
}

export function createWeightedTrafficRouter(input: WeightedTrafficInput): WeightedTrafficRouter {
  return new WeightedTrafficRouter(input);
}
