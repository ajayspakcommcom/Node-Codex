import test from "node:test";
import assert from "node:assert/strict";

import { evaluateDeliveryOutcome } from "../../dist/pipeline/delivery-policy.js";
import { reviewSchemaEvolution } from "../../dist/pipeline/schema-governance.js";

test("transient delivery failure retries while budget remains", () => {
  const decision = evaluateDeliveryOutcome({
    attempts: 2,
    maxAttempts: 5,
    errorCategory: "transient",
  });

  assert.equal(decision.action, "retry");
});

test("permanent delivery failure goes to dead letter immediately", () => {
  const decision = evaluateDeliveryOutcome({
    attempts: 1,
    maxAttempts: 5,
    errorCategory: "permanent",
  });

  assert.equal(decision.action, "dead-letter");
});

test("schema review blocks changes that are not replay compatible", () => {
  const review = reviewSchemaEvolution({
    currentVersion: 4,
    proposedVersion: 5,
    backwardCompatible: true,
    replayCompatible: false,
  });

  assert.equal(review.approved, false);
  assert.equal(review.reason, "replay-compatibility-required");
});
