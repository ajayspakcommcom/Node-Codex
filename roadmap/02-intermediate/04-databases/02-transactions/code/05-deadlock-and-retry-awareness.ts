import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { AccountRepository } from "./module/repositories/account-repository.js";
import { InventoryRepository } from "./module/repositories/inventory-repository.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OutboxRepository } from "./module/repositories/outbox-repository.js";
import { OrderPlacementService } from "./module/services/order-placement-service.js";
import { createSeedState } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());
transactionManager.configureDeadlock("high-contention-order", 1);

const orderPlacementService = new OrderPlacementService(
  transactionManager,
  new AccountRepository(),
  new InventoryRepository(),
  new OrderRepository(),
  new OutboxRepository(),
);

const result = orderPlacementService.placeOrder({
  userId: "acct_buyer_1",
  sku: "headphones-studio",
  units: 2,
  totalInCents: 39_800,
  isolationLevel: "serializable",
  workflowName: "high-contention-order",
  maxRetries: 1,
});

logger.info("Deadlock and retry awareness", {
  metrics: result.metrics,
  committedOrder: result.value.order,
  guidance: "High-contention workflows should assume deadlocks can happen and define safe retry behavior for the exact operations that are idempotent enough to repeat.",
});
