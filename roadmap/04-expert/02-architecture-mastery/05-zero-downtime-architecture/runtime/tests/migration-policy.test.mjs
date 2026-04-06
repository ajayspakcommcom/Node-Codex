import test from "node:test";
import assert from "node:assert/strict";

import { validateMigrationPlan } from "../../dist/schema/migration-policy.js";

test("migration plan must keep expand steps before contract steps", () => {
  assert.equal(
    validateMigrationPlan([
      {
        id: "expand-ledger",
        phase: "expand",
        targetSchemaVersion: 8,
        description: "Add additive columns.",
      },
      {
        id: "contract-ledger",
        phase: "contract",
        targetSchemaVersion: 8,
        description: "Remove deprecated columns after cutover.",
      },
    ]),
    true,
  );
});

test("migration plan rejects expand after contract", () => {
  assert.throws(
    () =>
      validateMigrationPlan([
        {
          id: "contract-ledger",
          phase: "contract",
          targetSchemaVersion: 8,
          description: "Unsafe early contraction.",
        },
        {
          id: "expand-ledger",
          phase: "expand",
          targetSchemaVersion: 9,
          description: "Late additive step.",
        },
      ]),
    /Expand steps cannot come after contract steps/,
  );
});
