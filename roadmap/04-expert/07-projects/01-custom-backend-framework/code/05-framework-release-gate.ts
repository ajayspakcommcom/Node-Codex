import { evaluateFrameworkReleaseGate } from "./framework/release-gate.js";

console.log(
  evaluateFrameworkReleaseGate({
    hasChangelog: true,
    hasMigrationGuide: true,
    compatibilityTestsPassing: true,
    adoptingServiceValidationPassing: true,
  }),
);
