import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { OrderReadRepository } from "./module/repositories/order-read-repository.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const repository = new OrderReadRepository(new InMemoryMongoCollection(exampleOrders));
const result = repository.listOrderIdsForRetryReview("tenant_alpha");

logger.info("Readable query object patterns", {
  retryReviewOrders: result.documents,
  summary: result.summary,
  guidance: "Readable repository methods make important filters, projections, and sort clauses easier to review than inline query objects scattered across controllers.",
});
