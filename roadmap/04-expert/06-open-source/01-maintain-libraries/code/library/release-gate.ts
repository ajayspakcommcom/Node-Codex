import type { ReleaseType } from "./semver-policy.js";

export interface ReleaseGateInput {
  releaseType: ReleaseType;
  hasChangelog: boolean;
  hasMigrationGuide: boolean;
  testsPassing: boolean;
}

export interface ReleaseGateResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function evaluateReleaseGate(input: ReleaseGateInput): ReleaseGateResult {
  const blockingReasons: string[] = [];

  if (!input.testsPassing) {
    blockingReasons.push("tests must pass before release");
  }

  if (!input.hasChangelog) {
    blockingReasons.push("changelog is required before release");
  }

  if ((input.releaseType === "minor" || input.releaseType === "major") && !input.hasMigrationGuide) {
    blockingReasons.push("migration guidance is required for consumer-visible changes");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
