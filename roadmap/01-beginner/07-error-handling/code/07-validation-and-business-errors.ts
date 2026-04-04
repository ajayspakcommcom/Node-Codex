import { BusinessRuleError, ValidationError } from "./shared/errors.js";

interface CheckoutInput {
  readonly amount: number;
  readonly isAccountDisabled: boolean;
}

function validateCheckoutInput(input: CheckoutInput): void {
  if (input.amount <= 0) {
    throw new ValidationError("Amount must be greater than zero");
  }
}

function enforceBusinessRules(input: CheckoutInput): void {
  if (input.isAccountDisabled) {
    throw new BusinessRuleError("Account is disabled");
  }
}

try {
  const input: CheckoutInput = {
    amount: 100,
    isAccountDisabled: true,
  };

  validateCheckoutInput(input);
  enforceBusinessRules(input);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Handled domain-oriented failure:", error.name, error.message);
  }
}
