import { createDefaultExperiment } from "../../dist/chaos/experiment-catalog.js";
import { evaluateSteadyState } from "../../dist/chaos/steady-state.js";
import { reviewBlastRadius } from "../../dist/chaos/blast-radius.js";
import { shouldAbortExperiment } from "../../dist/chaos/abort-policy.js";

const experiment = createDefaultExperiment();
const steadyStateHealthy = evaluateSteadyState({
  p95LatencyMs: 180,
  errorRatePercent: 0.4,
  maxP95LatencyMs: 250,
  maxErrorRatePercent: 1,
});
const blastRadiusSafe = reviewBlastRadius({
  affectedServices: 1,
  maximumAllowedServices: 2,
});
const abortTriggered = shouldAbortExperiment({
  p95LatencyMs: 260,
  errorRatePercent: 0.8,
  abortP95LatencyMs: 400,
  abortErrorRatePercent: 2,
});

console.log(
  JSON.stringify({
    scenario: "chaos-review",
    experiment: experiment.name,
    steadyStateHealthy,
    blastRadiusSafe,
    abortTriggered,
  }),
);
