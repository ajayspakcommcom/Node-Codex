import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";
import { runWithConcurrencyLimit, withTimeout } from "./shared/async-helpers.js";

class InvoiceSyncService {
  public async syncInvoices(invoiceIds: readonly string[]): Promise<readonly unknown[]> {
    return runWithConcurrencyLimit(invoiceIds, 2, async (invoiceId) =>
      withTimeout(
        (signal) => fetchDependency(invoiceId, 40, false, signal),
        100,
      ),
    );
  }
}

async function run(): Promise<void> {
  const service = new InvoiceSyncService();
  const results = await service.syncInvoices(["invoice-1", "invoice-2", "invoice-3"]);

  logger.info("Maintainable async orchestration example", {
    results,
    rule: "Keep retries, timeouts, and concurrency control behind explicit service boundaries instead of scattering them across controllers.",
  });
}

void run();
