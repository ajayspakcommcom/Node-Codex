import test from "node:test";
import assert from "node:assert/strict";

import { reviewBlastRadius } from "../../dist/chaos/blast-radius.js";
import { shouldAbortExperiment } from "../../dist/chaos/abort-policy.js";

test("blast radius stays within allowed scope", () => {
  assert.equal(
    reviewBlastRadius({
      affectedServices: 1,
      maximumAllowedServices: 2,
    }),
    true,
  );
});

test("abort policy triggers when thresholds are exceeded", () => {
  assert.equal(
    shouldAbortExperiment({
      p95LatencyMs: 420,
      errorRatePercent: 1.8,
      abortP95LatencyMs: 400,
      abortErrorRatePercent: 2,
    }),
    true,
  );
});
