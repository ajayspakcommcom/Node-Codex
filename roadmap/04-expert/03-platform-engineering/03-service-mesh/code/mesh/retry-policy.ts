export interface RetryOwnershipInput {
  meshRetriesEnabled: boolean;
  applicationRetriesEnabled: boolean;
}

export function validateRetryOwnership(input: RetryOwnershipInput): true {
  if (input.meshRetriesEnabled && input.applicationRetriesEnabled) {
    throw new Error("Mesh retries and application retries cannot both be enabled without coordination");
  }

  return true;
}
