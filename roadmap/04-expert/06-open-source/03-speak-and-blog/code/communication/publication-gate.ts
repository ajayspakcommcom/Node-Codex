import type { ContentDraft } from "./content-draft.js";
import { reviewConfidentiality } from "./confidentiality-check.js";
import { validateEvidenceQuality } from "./evidence-review.js";
import { validateStructure } from "./structure-validator.js";

export interface PublicationReview {
  approved: boolean;
  blockingReasons: readonly string[];
}

export function reviewForPublication(draft: ContentDraft): PublicationReview {
  const blockingReasons: string[] = [];

  if (!validateStructure(draft)) {
    blockingReasons.push("content structure is incomplete");
  }

  if (
    !validateEvidenceQuality({
      hasMetrics: draft.hasMetrics,
      hasConcreteExample: draft.hasConcreteExample,
      hasOperationalLesson: draft.hasOperationalLesson,
    })
  ) {
    blockingReasons.push("content needs stronger evidence and operational lessons");
  }

  if (
    !reviewConfidentiality({
      containsCustomerNames: draft.containsCustomerNames,
      containsInternalSystemNames: draft.containsInternalSystemNames,
      hasBeenGeneralized: draft.hasBeenGeneralized,
    })
  ) {
    blockingReasons.push("confidentiality review failed");
  }

  return {
    approved: blockingReasons.length === 0,
    blockingReasons,
  };
}
