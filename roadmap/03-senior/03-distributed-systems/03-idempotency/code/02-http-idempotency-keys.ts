import { createLogger } from "./shared/logger";
import { IdempotencyStore } from "./shared/idempotency-store";

const logger = createLogger("http-idempotency");

interface PaymentRequest {
  readonly customerId: string;
  readonly amount: number;
}

class PaymentApiService {
  constructor(private readonly idempotencyStore: IdempotencyStore) {}

  async createPayment(idempotencyKey: string, request: PaymentRequest): Promise<string> {
    const existing = this.idempotencyStore.get(idempotencyKey);

    if (existing?.status === "completed") {
      logger.info("replayed_response", { idempotencyKey });
      return existing.responseId;
    }

    this.idempotencyStore.markInProgress(idempotencyKey);

    const paymentId = `pay_${request.customerId}_${request.amount}`;
    this.idempotencyStore.markCompleted(idempotencyKey, paymentId);

    return paymentId;
  }
}

async function main(): Promise<void> {
  const service = new PaymentApiService(new IdempotencyStore());
  const key = "idem_payment_101";

  logger.info("first_call", {
    paymentId: await service.createPayment(key, { customerId: "cus_10", amount: 2500 }),
  });

  logger.info("duplicate_call", {
    paymentId: await service.createPayment(key, { customerId: "cus_10", amount: 2500 }),
  });
}

void main();
