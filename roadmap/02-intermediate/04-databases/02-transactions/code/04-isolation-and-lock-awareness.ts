import { InMemoryTransactionManager } from "./module/db/in-memory-transaction-manager.js";
import { createSeedState, isolationProfiles } from "./shared/transaction-runtime.js";
import { logger } from "./shared/logger.js";

const transactionManager = new InMemoryTransactionManager(createSeedState());

const simulations = isolationProfiles.map((profile) => {
  const result = transactionManager.runInTransaction(
    {
      name: `simulate-${profile.level}`,
      isolationLevel: profile.level,
    },
    (transaction) => {
      if (profile.level === "serializable") {
        transaction.recordDatabaseWork(4);
      } else if (profile.level === "repeatable-read") {
        transaction.recordDatabaseWork(3);
      } else {
        transaction.recordDatabaseWork(2);
      }

      return {
        level: profile.level,
        tradeoff: profile.tradeoff,
      };
    },
  );

  return {
    profile,
    metrics: result.metrics,
  };
});

logger.info("Isolation and lock awareness", {
  simulations,
  guidance: "Stronger isolation can protect more invariants, but it usually increases coordination cost and retry pressure under concurrency.",
});
