import { evaluateSteadyState } from "./chaos/steady-state.js";

console.log(
  evaluateSteadyState({
    p95LatencyMs: 180,
    errorRatePercent: 0.4,
    maxP95LatencyMs: 250,
    maxErrorRatePercent: 1,
  }),
);
