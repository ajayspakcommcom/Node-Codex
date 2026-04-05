import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { OrderReadRepository } from "./module/repositories/order-read-repository.js";
import { QueryParameterValidator } from "./module/validators/query-parameter-validator.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const validator = new QueryParameterValidator();
const validation = validator.validate({
  status: "placed",
  page: -4,
  pageSize: 500,
  sortBy: "createdAt",
  sortDirection: "desc",
});
const result = new OrderReadRepository(new InMemoryMongoCollection(exampleOrders)).listOrdersForGrid(
  "tenant_alpha",
  validation.safeParameters,
);

logger.warn("Parameter validation and input safety", {
  warnings: validation.warnings,
  safeParameters: validation.safeParameters,
  resultSummary: result.summary,
  guidance: "Flexible query endpoints should validate and constrain user input before turning it into MongoDB filter or sort objects.",
});
