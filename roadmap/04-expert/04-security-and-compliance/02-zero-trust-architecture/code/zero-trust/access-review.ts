import { createDefaultAuthorizationPolicy } from "./authorization-policy.js";
import { validateCredentialPolicy } from "./credential-policy.js";

export interface AccessReviewInput {
  principal: string;
  resource: string;
  credentialTtlMinutes: number;
}

export interface AccessReviewResult {
  approved: boolean;
  reasons: readonly string[];
}

export function reviewAccessRequest(input: AccessReviewInput): AccessReviewResult {
  const reasons: string[] = [];
  const policy = createDefaultAuthorizationPolicy();

  if (!policy.isAllowed({ principal: input.principal, resource: input.resource })) {
    reasons.push("authorization policy does not allow this access");
  }

  try {
    validateCredentialPolicy({
      ttlMinutes: input.credentialTtlMinutes,
      maximumTtlMinutes: 60,
    });
  } catch (error) {
    reasons.push((error as Error).message);
  }

  return {
    approved: reasons.length === 0,
    reasons,
  };
}
