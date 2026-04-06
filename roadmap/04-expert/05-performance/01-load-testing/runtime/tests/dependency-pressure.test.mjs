import test from "node:test";
import assert from "node:assert/strict";

import { assessDependencyPressure } from "../../dist/load-test/dependency-pressure.js";

test("dependency pressure becomes elevated when latency or errors rise", () => {
  const result = assessDependencyPressure({
    dependencyName: "payments-db",
    p95LatencyMs: 95,
    errorRatePercent: 0.8,
  });

  assert.equal(result.pressureLevel, "elevated");
});
