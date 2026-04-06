export interface FrameworkReleaseGateInput {
  hasChangelog: boolean;
  hasMigrationGuide: boolean;
  compatibilityTestsPassing: boolean;
  adoptingServiceValidationPassing: boolean;
}

export interface FrameworkReleaseGateResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function evaluateFrameworkReleaseGate(input: FrameworkReleaseGateInput): FrameworkReleaseGateResult {
  const blockingReasons: string[] = [];

  if (!input.hasChangelog) {
    blockingReasons.push("changelog is required before framework release");
  }

  if (!input.hasMigrationGuide) {
    blockingReasons.push("migration guide is required before framework release");
  }

  if (!input.compatibilityTestsPassing) {
    blockingReasons.push("compatibility tests must pass before framework release");
  }

  if (!input.adoptingServiceValidationPassing) {
    blockingReasons.push("adopting service validation must pass before framework release");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
