import { assertRollbackSafe, type ServiceRelease } from "./rollout/compatibility-rules.js";

const oldRelease: ServiceRelease = {
  version: "catalog-api@5.3.0",
  minReadableSchemaVersion: 10,
  maxWritableSchemaVersion: 10,
  acceptedContractVersions: ["2026-01"],
  emittedContractVersions: ["2026-01"],
};

const newRelease: ServiceRelease = {
  version: "catalog-api@5.4.0",
  minReadableSchemaVersion: 10,
  maxWritableSchemaVersion: 11,
  acceptedContractVersions: ["2026-01", "2026-04"],
  emittedContractVersions: ["2026-01", "2026-04"],
};

assertRollbackSafe(oldRelease, newRelease);
console.log("rollback path is valid");
