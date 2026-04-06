export interface ContributionReviewInput {
  testsIncluded: boolean;
  compatibilityReviewed: boolean;
  supportScopeClear: boolean;
}

export interface ContributionReviewResult {
  accepted: boolean;
  blockingReasons: readonly string[];
}

export function reviewContribution(input: ContributionReviewInput): ContributionReviewResult {
  const blockingReasons: string[] = [];

  if (!input.testsIncluded) {
    blockingReasons.push("tests are required for contributed changes");
  }

  if (!input.compatibilityReviewed) {
    blockingReasons.push("compatibility review is required");
  }

  if (!input.supportScopeClear) {
    blockingReasons.push("support scope must be clear before merge");
  }

  return {
    accepted: blockingReasons.length === 0,
    blockingReasons,
  };
}
