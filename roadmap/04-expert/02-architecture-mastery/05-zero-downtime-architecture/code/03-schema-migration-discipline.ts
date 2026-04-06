import { validateMigrationPlan } from "./schema/migration-policy.js";

console.log(
  validateMigrationPlan([
    {
      id: "expand-payments-ledger",
      phase: "expand",
      targetSchemaVersion: 4,
      description: "Add nullable settlement columns read-safe for old code.",
    },
    {
      id: "remove-legacy-columns",
      phase: "contract",
      targetSchemaVersion: 4,
      description: "Remove v1-only columns after v1 instances are drained.",
    },
  ]),
);
