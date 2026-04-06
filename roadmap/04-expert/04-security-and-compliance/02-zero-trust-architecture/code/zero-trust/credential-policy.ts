export interface CredentialPolicyInput {
  ttlMinutes: number;
  maximumTtlMinutes: number;
}

export function validateCredentialPolicy(input: CredentialPolicyInput): true {
  if (input.ttlMinutes > input.maximumTtlMinutes) {
    throw new Error(`Credential TTL exceeds maximum allowed TTL of ${input.maximumTtlMinutes} minutes`);
  }

  return true;
}
