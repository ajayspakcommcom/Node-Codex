import test from "node:test";
import assert from "node:assert/strict";

import { summarizeLoadTestResult } from "../../dist/load-test/result-summary.js";
import { evaluateReleaseGate } from "../../dist/load-test/release-gate.js";

test("healthy result summary marks tail latency and error rate as healthy", () => {
  const summary = summarizeLoadTestResult({
    p95LatencyMs: 180,
    p99LatencyMs: 320,
    errorRatePercent: 0.3,
    sustainedRps: 1400,
  });

  assert.equal(summary.healthyTailLatency, true);
  assert.equal(summary.healthyErrorRate, true);
});

test("release gate blocks when thresholds are exceeded", () => {
  const result = evaluateReleaseGate({
    p95LatencyMs: 260,
    p99LatencyMs: 520,
    errorRatePercent: 1.2,
    thresholds: {
      maxP95LatencyMs: 220,
      maxP99LatencyMs: 400,
      maxErrorRatePercent: 1,
    },
  });

  assert.equal(result.approved, false);
  assert.equal(result.blockingReasons.length, 3);
});
