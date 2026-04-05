import { AccountRepository } from "./module/repositories/account-repository.js";
import { InventoryRepository } from "./module/repositories/inventory-repository.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OutboxRepository } from "./module/repositories/outbox-repository.js";
import { OrderPlacementService } from "./module/services/order-placement-service.js";
import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { createSeedState } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());
const orderPlacementService = new OrderPlacementService(
  transactionManager,
  new AccountRepository(),
  new InventoryRepository(),
  new OrderRepository(),
  new OutboxRepository(),
);

const result = orderPlacementService.placeOrder({
  userId: "acct_buyer_1",
  sku: "laptop-pro",
  units: 1,
  totalInCents: 129_900,
});
const snapshot = transactionManager.snapshot();

logger.info("Atomic order placement", {
  metrics: result.metrics,
  order: result.value.order,
  buyerBalanceAfterCommit: snapshot.accounts.find((account) => account.id === "acct_buyer_1")?.balanceInCents,
  inventoryAfterCommit: snapshot.inventories.find((inventory) => inventory.sku === "laptop-pro"),
  outboxEvents: snapshot.outboxEvents,
  guidance: "The debit, inventory reservation, order creation, and outbox write commit together as one business unit.",
});
