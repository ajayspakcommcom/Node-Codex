import test from "node:test";
import assert from "node:assert/strict";

import { scoreThreat } from "../../dist/threat-model/risk-scoring.js";

test("high impact and medium likelihood produces expected score", () => {
  assert.equal(
    scoreThreat({
      impact: "high",
      likelihood: "medium",
    }),
    6,
  );
});

test("low impact and low likelihood stays low score", () => {
  assert.equal(
    scoreThreat({
      impact: "low",
      likelihood: "low",
    }),
    1,
  );
});
