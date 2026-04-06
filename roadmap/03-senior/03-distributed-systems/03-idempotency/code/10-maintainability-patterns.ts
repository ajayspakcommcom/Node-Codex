import { createLogger } from "./shared/logger";
import { IdempotencyStore } from "./shared/idempotency-store";

const logger = createLogger("maintainability");

interface InvoiceResult {
  readonly invoiceId: string;
}

class InvoiceCreationService {
  constructor(private readonly idempotencyStore: IdempotencyStore) {}

  async createInvoice(idempotencyKey: string, customerId: string): Promise<InvoiceResult> {
    const existing = this.idempotencyStore.get(idempotencyKey);

    if (existing?.status === "completed") {
      return { invoiceId: existing.responseId };
    }

    this.idempotencyStore.markInProgress(idempotencyKey);

    const invoiceId = `inv_${customerId}`;
    this.idempotencyStore.markCompleted(idempotencyKey, invoiceId);

    logger.info("invoice_created", { idempotencyKey, invoiceId });

    return { invoiceId };
  }
}

async function main(): Promise<void> {
  const service = new InvoiceCreationService(new IdempotencyStore());
  await service.createInvoice("idem_invoice_11", "cus_501");
}

void main();
