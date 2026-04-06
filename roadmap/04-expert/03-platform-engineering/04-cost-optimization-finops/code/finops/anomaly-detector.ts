export interface CostAnomalyInput {
  previousMonthlyCostUsd: number;
  currentMonthlyCostUsd: number;
  thresholdIncreasePercent: number;
}

export interface CostAnomalyResult {
  anomalyDetected: boolean;
  increasePercent: number;
}

export function detectCostAnomaly(input: CostAnomalyInput): CostAnomalyResult {
  if (input.previousMonthlyCostUsd <= 0) {
    throw new Error("Previous monthly cost must be greater than zero");
  }

  const increasePercent =
    ((input.currentMonthlyCostUsd - input.previousMonthlyCostUsd) / input.previousMonthlyCostUsd) * 100;

  return {
    anomalyDetected: increasePercent >= input.thresholdIncreasePercent,
    increasePercent,
  };
}
