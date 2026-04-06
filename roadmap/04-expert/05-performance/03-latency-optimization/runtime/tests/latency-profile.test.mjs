import test from "node:test";
import assert from "node:assert/strict";

import { summarizeLatencyProfile } from "../../dist/latency/latency-profile.js";

test("wide p99 spread marks a tail latency concern", () => {
  const summary = summarizeLatencyProfile({
    p50Ms: 45,
    p95Ms: 180,
    p99Ms: 420,
  });

  assert.equal(summary.tailLatencyConcern, true);
});
