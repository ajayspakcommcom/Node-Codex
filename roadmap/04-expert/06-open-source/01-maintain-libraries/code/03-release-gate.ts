import { evaluateReleaseGate } from "./library/release-gate.js";

console.log(
  evaluateReleaseGate({
    releaseType: "minor",
    hasChangelog: true,
    hasMigrationGuide: true,
    testsPassing: true,
  }),
);
