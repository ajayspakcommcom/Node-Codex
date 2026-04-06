import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

const boundedContexts = {
  orders: {
    owns: ["order placement", "order lifecycle", "item quantity invariants"],
  },
  billing: {
    owns: ["charge authorization", "ledger posting", "payment settlement"],
  },
  reporting: {
    owns: ["read-optimized analytics", "cross-domain summaries"],
  },
};

logger.info("bounded_contexts_defined", {
  boundedContexts,
});
