import { evaluateReleaseGate } from "./load-test/release-gate.js";

console.log(
  evaluateReleaseGate({
    p95LatencyMs: 180,
    p99LatencyMs: 320,
    errorRatePercent: 0.3,
    thresholds: {
      maxP95LatencyMs: 220,
      maxP99LatencyMs: 400,
      maxErrorRatePercent: 1,
    },
  }),
);
