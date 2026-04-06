import type { RfcDocument } from "./rfc-document.js";

export interface RfcReviewResult {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function reviewRfc(document: RfcDocument): RfcReviewResult {
  const blockingReasons: string[] = [];

  if (!document.problemStatement.trim()) {
    blockingReasons.push("problem statement is required");
  }

  if (document.nonGoals.length === 0) {
    blockingReasons.push("non-goals are required");
  }

  if (document.alternatives.length === 0) {
    blockingReasons.push("alternatives and tradeoffs are required");
  }

  if (!document.migrationPlan.trim()) {
    blockingReasons.push("migration plan is required");
  }

  if (!document.rollbackPlan.trim()) {
    blockingReasons.push("rollback plan is required");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
