import { createLogger } from "./shared/logger";
import { IdempotencyStore } from "./shared/idempotency-store";

const logger = createLogger("external-side-effects");

class EmailSender {
  async sendReceipt(paymentId: string): Promise<void> {
    logger.info("receipt_sent", { paymentId });
  }
}

class SafeReceiptService {
  constructor(
    private readonly idempotencyStore: IdempotencyStore,
    private readonly emailSender: EmailSender,
  ) {}

  async sendOnce(idempotencyKey: string, paymentId: string): Promise<void> {
    const existing = this.idempotencyStore.get(idempotencyKey);

    if (existing?.status === "completed") {
      logger.info("duplicate_side_effect_prevented", { idempotencyKey, paymentId });
      return;
    }

    this.idempotencyStore.markInProgress(idempotencyKey);
    await this.emailSender.sendReceipt(paymentId);
    this.idempotencyStore.markCompleted(idempotencyKey, paymentId);
  }
}

async function main(): Promise<void> {
  const service = new SafeReceiptService(new IdempotencyStore(), new EmailSender());
  await service.sendOnce("idem_receipt_1", "pay_1");
  await service.sendOnce("idem_receipt_1", "pay_1");
}

void main();
