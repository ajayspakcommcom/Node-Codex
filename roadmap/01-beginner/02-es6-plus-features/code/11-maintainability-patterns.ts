import { createLogger } from "./shared/logger.js";

interface ChargeRequest {
  readonly userId: string;
  readonly amount: number;
  readonly currency?: string;
}

interface ChargeResponse {
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: "accepted";
}

function normalizeChargeRequest({
  userId,
  amount,
  currency = "USD",
}: ChargeRequest): ChargeResponse {
  return {
    userId,
    amount,
    currency,
    status: "accepted",
  };
}

const logger = createLogger({ service: "payments-service", requestId: "req_pay_1" });
const charge = normalizeChargeRequest({ userId: "usr_500", amount: 2500 });

logger.info("Accepted charge request", charge);
