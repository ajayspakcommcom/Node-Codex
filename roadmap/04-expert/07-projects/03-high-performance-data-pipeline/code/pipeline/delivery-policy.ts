import type { ErrorCategory } from "./pipeline-types.js";

export interface DeliveryReviewInput {
  attempts: number;
  maxAttempts: number;
  errorCategory: ErrorCategory;
}

export interface DeliveryDecision {
  action: "retry" | "dead-letter";
  reason: string;
}

export function evaluateDeliveryOutcome(input: DeliveryReviewInput): DeliveryDecision {
  if (input.errorCategory === "permanent") {
    return { action: "dead-letter", reason: "permanent-failure" };
  }

  if (input.attempts >= input.maxAttempts) {
    return { action: "dead-letter", reason: "retry-budget-exhausted" };
  }

  return { action: "retry", reason: "transient-failure-with-budget-remaining" };
}
