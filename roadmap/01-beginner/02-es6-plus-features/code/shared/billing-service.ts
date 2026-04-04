import type { ChargeInput, ChargeResult } from "./billing-contracts.js";

export function normalizeCharge({
  invoiceId,
  amount,
  currency = "USD",
}: ChargeInput): ChargeResult {
  return {
    invoiceId,
    amount,
    currency,
    status: "accepted",
  };
}
