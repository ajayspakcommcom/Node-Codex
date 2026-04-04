import type { ChargeInput } from "./shared/billing-contracts.js";
import { normalizeCharge } from "./shared/billing-service.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger({ service: "billing-api", requestId: "req_bill_1" });

function acceptCharge(input: ChargeInput) {
  const charge = normalizeCharge(input);

  logger.info(`Accepted invoice ${charge.invoiceId}`, {
    amount: charge.amount,
    currency: charge.currency,
    status: charge.status,
  });

  return charge;
}

console.log(
  acceptCharge({
    invoiceId: "inv_880",
    amount: 4999,
  }),
);
