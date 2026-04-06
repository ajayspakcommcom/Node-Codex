import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

interface PricingInput {
  readonly subtotalInCents: number;
  readonly taxRate: number;
  readonly discountInCents: number;
}

function calculateFinalPrice(input: PricingInput): number {
  const discountedSubtotal = input.subtotalInCents - input.discountInCents;
  return discountedSubtotal + discountedSubtotal * input.taxRate;
}

const finalPrice = calculateFinalPrice({
  subtotalInCents: 10000,
  taxRate: 0.18,
  discountInCents: 500,
});

logger.info("function_shape_consistency_example", {
  finalPrice,
  note: "Prefer one explicit input shape on hot functions instead of many loosely-shaped call signatures.",
});
