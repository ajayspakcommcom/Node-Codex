import type { ChargeInput, ChargeResult } from "./contracts.js";

export function normalizeCharge({ invoiceId, amount, currency = "USD" }: ChargeInput): ChargeResult {
  return {
    invoiceId,
    amount,
    currency,
    status: "accepted",
  };
}
