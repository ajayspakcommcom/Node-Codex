export interface UnitCostInput {
  monthlyCostUsd: number;
  monthlyRequestCount: number;
}

export function calculateUnitCost(input: UnitCostInput): number {
  if (input.monthlyRequestCount <= 0) {
    throw new Error("Monthly request count must be greater than zero");
  }

  return input.monthlyCostUsd / input.monthlyRequestCount;
}
