import test from "node:test";
import assert from "node:assert/strict";

import { createDefaultExperiment } from "../../dist/chaos/experiment-catalog.js";
import { summarizeExperimentOutcome } from "../../dist/chaos/outcome-summary.js";

test("default experiment exposes a hypothesis", () => {
  const experiment = createDefaultExperiment();

  assert.ok(experiment.hypothesis.length > 0);
});

test("failed hypothesis requires follow-up", () => {
  const summary = summarizeExperimentOutcome({
    hypothesisConfirmed: false,
    resilienceGap: "fallback path caused unacceptable payment latency",
  });

  assert.equal(summary.requiresFollowUp, true);
});
