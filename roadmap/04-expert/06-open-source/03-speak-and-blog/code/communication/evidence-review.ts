export interface EvidenceReviewInput {
  hasMetrics: boolean;
  hasConcreteExample: boolean;
  hasOperationalLesson: boolean;
}

export function validateEvidenceQuality(input: EvidenceReviewInput): boolean {
  return input.hasMetrics && input.hasConcreteExample && input.hasOperationalLesson;
}
