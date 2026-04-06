import { buildDeploymentPlan } from "../../dist/rollout/deployment-plan.js";
import { ConnectionDrainController } from "../../dist/runtime/connection-drain-controller.js";
import { validateMigrationPlan } from "../../dist/schema/migration-policy.js";

const currentRelease = {
  version: "orders-api@7.3.0",
  minReadableSchemaVersion: 12,
  maxWritableSchemaVersion: 12,
  acceptedContractVersions: ["2026-01"],
  emittedContractVersions: ["2026-01"],
};

const candidateRelease = {
  version: "orders-api@7.4.0",
  minReadableSchemaVersion: 12,
  maxWritableSchemaVersion: 13,
  acceptedContractVersions: ["2026-01", "2026-04"],
  emittedContractVersions: ["2026-01", "2026-04"],
};

const plan = buildDeploymentPlan({
  currentRelease,
  candidateRelease,
  runtime: {
    activeSchemaVersion: 12,
    acceptedContractVersions: ["2026-01"],
  },
});

validateMigrationPlan([
  {
    id: "expand-orders-schema",
    phase: "expand",
    targetSchemaVersion: 13,
    description: "Add nullable fulfillment fields.",
  },
  {
    id: "contract-orders-schema",
    phase: "contract",
    targetSchemaVersion: 13,
    description: "Remove v1-only columns after cutover.",
  },
]);

const drainController = new ConnectionDrainController();
drainController.acceptRequest("req-a");
drainController.acceptRequest("req-b");
drainController.beginDrain();
drainController.finishRequest("req-a");
drainController.finishRequest("req-b");

console.log(
  JSON.stringify({
    scenario: "zero-downtime-rollout",
    steps: plan.map((step) => step.name),
    safeToExit: drainController.snapshot().safeToExit,
    candidateVersion: candidateRelease.version,
  }),
);
