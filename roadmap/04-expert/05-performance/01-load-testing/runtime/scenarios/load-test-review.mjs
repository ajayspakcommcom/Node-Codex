import { createDefaultTrafficProfile } from "../../dist/load-test/traffic-profile.js";
import { createScenarioCatalog } from "../../dist/load-test/scenario-catalog.js";
import { summarizeLoadTestResult } from "../../dist/load-test/result-summary.js";
import { evaluateReleaseGate } from "../../dist/load-test/release-gate.js";

const profile = createDefaultTrafficProfile();
const scenarios = createScenarioCatalog().list();
const summary = summarizeLoadTestResult({
  p95LatencyMs: 180,
  p99LatencyMs: 320,
  errorRatePercent: 0.3,
  sustainedRps: 1400,
});
const gate = evaluateReleaseGate({
  p95LatencyMs: 180,
  p99LatencyMs: 320,
  errorRatePercent: 0.3,
  thresholds: {
    maxP95LatencyMs: 220,
    maxP99LatencyMs: 400,
    maxErrorRatePercent: 1,
  },
});

console.log(
  JSON.stringify({
    scenario: "load-test-review",
    trafficSlices: profile.slices.length,
    scenarioCount: scenarios.length,
    sustainedRps: summary.sustainedRps,
    approved: gate.approved,
  }),
);
