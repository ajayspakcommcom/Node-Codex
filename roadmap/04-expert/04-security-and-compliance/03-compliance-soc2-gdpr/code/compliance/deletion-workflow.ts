export interface DeletionRequest {
  dataSet: string;
  classification: "personal-data" | "internal";
  hasVerifiedRequester: boolean;
  hasLinkedLegalHold: boolean;
}

export function validateDeletionRequest(request: DeletionRequest): true {
  if (request.classification === "personal-data" && !request.hasVerifiedRequester) {
    throw new Error("Deletion request for personal data requires verified requester identity");
  }

  if (request.hasLinkedLegalHold) {
    throw new Error("Deletion cannot proceed while legal hold is active");
  }

  return true;
}
