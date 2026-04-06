import { summarizeLoadTestResult } from "./load-test/result-summary.js";

console.log(
  summarizeLoadTestResult({
    p95LatencyMs: 180,
    p99LatencyMs: 320,
    errorRatePercent: 0.3,
    sustainedRps: 1400,
  }),
);
