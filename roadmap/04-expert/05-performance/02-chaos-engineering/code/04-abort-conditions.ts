import { shouldAbortExperiment } from "./chaos/abort-policy.js";

console.log(
  shouldAbortExperiment({
    p95LatencyMs: 420,
    errorRatePercent: 2.3,
    abortP95LatencyMs: 400,
    abortErrorRatePercent: 2,
  }),
);
