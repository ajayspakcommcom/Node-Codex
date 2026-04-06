import test from "node:test";
import assert from "node:assert/strict";

import { detectCostAnomaly } from "../../dist/finops/anomaly-detector.js";

test("large cost increase is flagged as anomaly", () => {
  const result = detectCostAnomaly({
    previousMonthlyCostUsd: 10000,
    currentMonthlyCostUsd: 14000,
    thresholdIncreasePercent: 20,
  });

  assert.equal(result.anomalyDetected, true);
});

test("small cost increase stays below threshold", () => {
  const result = detectCostAnomaly({
    previousMonthlyCostUsd: 10000,
    currentMonthlyCostUsd: 10800,
    thresholdIncreasePercent: 20,
  });

  assert.equal(result.anomalyDetected, false);
});
