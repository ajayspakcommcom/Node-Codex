export interface FrameworkUpgradeReviewInput {
  currentVersion: string;
  targetVersion: string;
  hasMigrationGuide: boolean;
  compatibilityTestsPassing: boolean;
}

export interface FrameworkUpgradeReviewResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function reviewFrameworkUpgrade(input: FrameworkUpgradeReviewInput): FrameworkUpgradeReviewResult {
  const blockingReasons: string[] = [];

  if (!input.hasMigrationGuide) {
    blockingReasons.push("migration guide is required for framework upgrades");
  }

  if (!input.compatibilityTestsPassing) {
    blockingReasons.push("compatibility tests must pass before upgrade approval");
  }

  if (input.currentVersion === input.targetVersion) {
    blockingReasons.push("target version must differ from current version");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
