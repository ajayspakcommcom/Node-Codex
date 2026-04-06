export interface CompensatingControlInput {
  primaryControlAvailable: boolean;
  compensatingControlDocumented: boolean;
  nextReviewOn: string;
}

export interface CompensatingControlResult {
  accepted: boolean;
}

export function reviewCompensatingControl(input: CompensatingControlInput): CompensatingControlResult {
  if (input.primaryControlAvailable) {
    return { accepted: true };
  }

  if (!input.compensatingControlDocumented) {
    throw new Error("Compensating control must be documented when primary control is unavailable");
  }

  if (!input.nextReviewOn) {
    throw new Error("Compensating control requires a next review date");
  }

  return { accepted: true };
}
