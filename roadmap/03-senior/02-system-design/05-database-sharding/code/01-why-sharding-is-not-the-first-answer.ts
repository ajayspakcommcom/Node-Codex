import { logger } from "./shared/logger.js";

logger.section("Why Sharding Is Not The First Answer");
logger.line("Senior rule: shard only after simpler scaling options such as indexing, query-shape cleanup, and vertical improvements are no longer enough.");
logger.line("Sharding adds routing, skew, migration, and cross-shard coordination cost.");
