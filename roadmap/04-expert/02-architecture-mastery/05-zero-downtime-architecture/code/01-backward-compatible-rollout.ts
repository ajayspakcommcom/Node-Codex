import { assertCompatibleRelease, type RuntimeEnvironment, type ServiceRelease } from "./rollout/compatibility-rules.js";
import { buildDeploymentPlan } from "./rollout/deployment-plan.js";

const currentRelease: ServiceRelease = {
  version: "payments-api@1.4.0",
  minReadableSchemaVersion: 3,
  maxWritableSchemaVersion: 3,
  acceptedContractVersions: ["2026-01"],
  emittedContractVersions: ["2026-01"],
};

const candidateRelease: ServiceRelease = {
  version: "payments-api@1.5.0",
  minReadableSchemaVersion: 3,
  maxWritableSchemaVersion: 4,
  acceptedContractVersions: ["2026-01", "2026-04"],
  emittedContractVersions: ["2026-01", "2026-04"],
};

const runtime: RuntimeEnvironment = {
  activeSchemaVersion: 3,
  acceptedContractVersions: ["2026-01"],
};

assertCompatibleRelease(candidateRelease, runtime);

console.log(
  buildDeploymentPlan({
    currentRelease,
    candidateRelease,
    runtime,
  }),
);
