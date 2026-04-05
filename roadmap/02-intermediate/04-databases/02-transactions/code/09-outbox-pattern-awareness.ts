import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { AccountRepository } from "./module/repositories/account-repository.js";
import { InventoryRepository } from "./module/repositories/inventory-repository.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OutboxRepository } from "./module/repositories/outbox-repository.js";
import { OrderPlacementService } from "./module/services/order-placement-service.js";
import { OutboxDispatcher } from "./module/services/outbox-dispatcher.js";
import { createSeedState } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());
const outboxRepository = new OutboxRepository();
const orderPlacementService = new OrderPlacementService(
  transactionManager,
  new AccountRepository(),
  new InventoryRepository(),
  new OrderRepository(),
  outboxRepository,
);
const outboxDispatcher = new OutboxDispatcher(transactionManager, outboxRepository);

const placementResult = orderPlacementService.placeOrder({
  userId: "acct_buyer_1",
  sku: "headphones-studio",
  units: 1,
  totalInCents: 19_900,
});
const snapshotAfterCommit = transactionManager.snapshot();
const dispatchResult = outboxDispatcher.dispatchPendingEvents();
const snapshotAfterDispatch = transactionManager.snapshot();

logger.info("Outbox pattern awareness", {
  placementMetrics: placementResult.metrics,
  pendingEventsAfterCommit: snapshotAfterCommit.outboxEvents,
  dispatchResult,
  outboxAfterDispatch: snapshotAfterDispatch.outboxEvents,
  guidance: "The order and outbox record commit together, while external delivery happens after commit through a separate dispatch step.",
});
