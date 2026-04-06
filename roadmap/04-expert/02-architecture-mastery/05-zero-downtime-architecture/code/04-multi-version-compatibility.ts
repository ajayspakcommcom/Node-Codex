import { hasRollbackOverlap, type ServiceRelease } from "./rollout/compatibility-rules.js";

const previous: ServiceRelease = {
  version: "orders-api@3.1.0",
  minReadableSchemaVersion: 7,
  maxWritableSchemaVersion: 7,
  acceptedContractVersions: ["2026-01"],
  emittedContractVersions: ["2026-01"],
};

const next: ServiceRelease = {
  version: "orders-api@3.2.0",
  minReadableSchemaVersion: 7,
  maxWritableSchemaVersion: 8,
  acceptedContractVersions: ["2026-01", "2026-04"],
  emittedContractVersions: ["2026-01", "2026-04"],
};

console.log({
  rollbackSafe: hasRollbackOverlap(previous, next),
});
