import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

interface CartLine {
  readonly sku: string;
  readonly quantity: number;
  readonly unitPriceInCents: number;
}

function summarizeCart(lines: readonly CartLine[]) {
  let totalQuantity = 0;
  let totalValue = 0;

  for (const line of lines) {
    totalQuantity += line.quantity;
    totalValue += line.quantity * line.unitPriceInCents;
  }

  return {
    totalQuantity,
    totalValue,
  };
}

const summary = summarizeCart([
  { sku: "sku_500", quantity: 1, unitPriceInCents: 1000 },
  { sku: "sku_501", quantity: 2, unitPriceInCents: 2500 },
]);

logger.info("allocation_pressure_review", {
  summary,
  note: "Prefer bounded loops and fewer transient objects on confirmed hot paths.",
});
