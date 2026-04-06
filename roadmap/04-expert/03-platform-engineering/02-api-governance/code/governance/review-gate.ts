export type ApiChangeType = "additive" | "risky" | "breaking-risk";

export interface ApiChangeReviewInput {
  contractId: string;
  currentVersion: string;
  proposedVersion: string;
  changeType: ApiChangeType;
  ownerApproved: boolean;
  hasDeprecationNotice: boolean;
  hasConsumerRolloutPlan: boolean;
  styleGuideSatisfied: boolean;
}

export interface ApiChangeReviewResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function reviewApiChange(input: ApiChangeReviewInput): ApiChangeReviewResult {
  const blockingReasons: string[] = [];

  if (!input.ownerApproved) {
    blockingReasons.push("contract owner approval is required");
  }

  if (!input.styleGuideSatisfied) {
    blockingReasons.push("API style guide requirements are not satisfied");
  }

  if (input.changeType !== "additive" && !input.hasConsumerRolloutPlan) {
    blockingReasons.push("consumer rollout plan is required for risky or breaking-risk changes");
  }

  if (input.changeType === "breaking-risk" && !input.hasDeprecationNotice) {
    blockingReasons.push("deprecation notice is required for breaking-risk changes");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
