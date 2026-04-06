import test from "node:test";
import assert from "node:assert/strict";

import { createRetentionPolicy } from "../../dist/compliance/retention-policy.js";
import { validateDeletionRequest } from "../../dist/compliance/deletion-workflow.js";

test("retention policy returns configured days", () => {
  const policy = createRetentionPolicy();

  assert.equal(policy.daysFor("customer-profile"), 365);
});

test("verified deletion request without legal hold passes", () => {
  assert.equal(
    validateDeletionRequest({
      dataSet: "customer-profile",
      classification: "personal-data",
      hasVerifiedRequester: true,
      hasLinkedLegalHold: false,
    }),
    true,
  );
});

test("unverified or legally held deletion request is rejected", () => {
  assert.throws(
    () =>
      validateDeletionRequest({
        dataSet: "customer-profile",
        classification: "personal-data",
        hasVerifiedRequester: false,
        hasLinkedLegalHold: false,
      }),
    /requires verified requester identity/,
  );
});
