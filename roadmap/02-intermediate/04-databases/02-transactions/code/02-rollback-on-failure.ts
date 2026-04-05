import { InMemoryTransactionManager, TransactionFailure } from "./module/db/in-memory-transaction-manager.js";
import { AccountRepository } from "./module/repositories/account-repository.js";
import { InventoryRepository } from "./module/repositories/inventory-repository.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OutboxRepository } from "./module/repositories/outbox-repository.js";
import { OrderPlacementService } from "./module/services/order-placement-service.js";
import { logger } from "./shared/logger.js";
import { createSeedState } from "./shared/transaction-runtime.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());
const orderPlacementService = new OrderPlacementService(
  transactionManager,
  new AccountRepository(),
  new InventoryRepository(),
  new OrderRepository(),
  new OutboxRepository(),
);
const beforeSnapshot = transactionManager.snapshot();

try {
  orderPlacementService.placeOrder({
    userId: "acct_buyer_1",
    sku: "laptop-pro",
    units: 20,
    totalInCents: 129_900,
  });
} catch (error: unknown) {
  if (!(error instanceof TransactionFailure)) {
    throw error;
  }

  const afterSnapshot = transactionManager.snapshot();

  logger.warn("Rollback on failure", {
    failureMessage: error.message,
    metrics: error.metrics,
    buyerBalanceBefore: beforeSnapshot.accounts.find((account) => account.id === "acct_buyer_1")?.balanceInCents,
    buyerBalanceAfter: afterSnapshot.accounts.find((account) => account.id === "acct_buyer_1")?.balanceInCents,
    orderCountAfterRollback: afterSnapshot.orders.length,
    outboxCountAfterRollback: afterSnapshot.outboxEvents.length,
    guidance: "Even though the workflow debits the account before checking stock, the failed transaction leaves no partial business state behind.",
  });
}
