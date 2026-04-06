import { summarizeExperimentOutcome } from "./chaos/outcome-summary.js";

console.log(
  summarizeExperimentOutcome({
    hypothesisConfirmed: false,
    resilienceGap: "fallback path caused unacceptable payment latency",
  }),
);
