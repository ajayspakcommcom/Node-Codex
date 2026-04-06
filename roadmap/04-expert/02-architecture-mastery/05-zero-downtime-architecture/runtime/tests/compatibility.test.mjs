import test from "node:test";
import assert from "node:assert/strict";

import {
  assertCompatibleRelease,
  assertRollbackSafe,
  hasRollbackOverlap,
} from "../../dist/rollout/compatibility-rules.js";
import { buildDeploymentPlan } from "../../dist/rollout/deployment-plan.js";

test("compatible release produces a zero-downtime deployment plan", () => {
  const currentRelease = {
    version: "billing-api@2.0.0",
    minReadableSchemaVersion: 5,
    maxWritableSchemaVersion: 5,
    acceptedContractVersions: ["2026-01"],
    emittedContractVersions: ["2026-01"],
  };

  const candidateRelease = {
    version: "billing-api@2.1.0",
    minReadableSchemaVersion: 5,
    maxWritableSchemaVersion: 6,
    acceptedContractVersions: ["2026-01", "2026-04"],
    emittedContractVersions: ["2026-01", "2026-04"],
  };

  const runtime = {
    activeSchemaVersion: 5,
    acceptedContractVersions: ["2026-01"],
  };

  assert.doesNotThrow(() => assertCompatibleRelease(candidateRelease, runtime));
  assert.equal(hasRollbackOverlap(currentRelease, candidateRelease), true);
  assert.doesNotThrow(() => assertRollbackSafe(currentRelease, candidateRelease));

  const plan = buildDeploymentPlan({
    currentRelease,
    candidateRelease,
    runtime,
  });

  assert.deepEqual(
    plan.map((step) => step.name),
    ["expand-schema", "deploy-compatible-version", "shift-traffic", "drain-previous-version", "contract-schema"],
  );
});

test("candidate that drops current contract compatibility is rejected", () => {
  const incompatibleRelease = {
    version: "billing-api@3.0.0",
    minReadableSchemaVersion: 5,
    maxWritableSchemaVersion: 6,
    acceptedContractVersions: ["2026-04"],
    emittedContractVersions: ["2026-04"],
  };

  assert.throws(
    () =>
      assertCompatibleRelease(incompatibleRelease, {
        activeSchemaVersion: 5,
        acceptedContractVersions: ["2026-01"],
      }),
    /does not accept any currently routed contract version/,
  );
});
