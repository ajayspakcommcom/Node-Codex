export interface ConfidentialityInput {
  containsCustomerNames: boolean;
  containsInternalSystemNames: boolean;
  hasBeenGeneralized: boolean;
}

export function reviewConfidentiality(input: ConfidentialityInput): boolean {
  if (input.containsCustomerNames) {
    return false;
  }

  if (input.containsInternalSystemNames && !input.hasBeenGeneralized) {
    return false;
  }

  return true;
}
