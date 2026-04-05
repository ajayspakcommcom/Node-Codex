import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { createSeedState } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());

const longTransaction = transactionManager.runInTransaction(
  {
    name: "long-transaction-anti-pattern",
    isolationLevel: "repeatable-read",
  },
  (transaction) => {
    transaction.recordDatabaseWork(2);
    transaction.recordDatabaseWork(12);
    transaction.recordDatabaseWork(2);
    return "Transaction stayed open while waiting on a slow dependency.";
  },
);

const shortTransaction = transactionManager.runInTransaction(
  {
    name: "short-transaction-boundary",
    isolationLevel: "repeatable-read",
  },
  (transaction) => {
    transaction.recordDatabaseWork(2);
    transaction.recordDatabaseWork(2);
    return "Slow dependency moved outside the transaction.";
  },
);

logger.warn("Long transaction risks", {
  antiPattern: longTransaction.metrics,
  improvedBoundary: shortTransaction.metrics,
  guidance: "Long transactions hold locks and database resources longer than necessary. Move slow remote work and post-commit steps outside the atomic boundary.",
});
