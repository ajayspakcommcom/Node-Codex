import { detectCostAnomaly } from "./finops/anomaly-detector.js";

console.log(
  detectCostAnomaly({
    previousMonthlyCostUsd: 9000,
    currentMonthlyCostUsd: 14200,
    thresholdIncreasePercent: 25,
  }),
);
