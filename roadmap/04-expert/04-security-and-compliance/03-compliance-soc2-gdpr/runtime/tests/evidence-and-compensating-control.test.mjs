import test from "node:test";
import assert from "node:assert/strict";

import { createEvidenceRecorder } from "../../dist/compliance/evidence-recorder.js";
import { reviewCompensatingControl } from "../../dist/compliance/compensating-control-review.js";

test("evidence recorder creates an evidence record", () => {
  const recorder = createEvidenceRecorder();
  const record = recorder.record({
    controlId: "soc2-access-review",
    source: "identity-audit-job",
  });

  assert.equal(record.status, "recorded");
});

test("documented compensating control with review date is accepted", () => {
  assert.deepEqual(
    reviewCompensatingControl({
      primaryControlAvailable: false,
      compensatingControlDocumented: true,
      nextReviewOn: "2026-08-01",
    }),
    { accepted: true },
  );
});

test("undocumented compensating control is rejected", () => {
  assert.throws(
    () =>
      reviewCompensatingControl({
        primaryControlAvailable: false,
        compensatingControlDocumented: false,
        nextReviewOn: "2026-08-01",
      }),
    /must be documented/,
  );
});
