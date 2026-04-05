import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { OrderReadRepository } from "./module/repositories/order-read-repository.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const repository = new OrderReadRepository(new InMemoryMongoCollection(exampleOrders));
const pageOne = repository.listOrdersForGrid("tenant_alpha", {
  status: "placed",
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 1,
  pageSize: 3,
});
const pageTwo = repository.listOrdersForGrid("tenant_alpha", {
  status: "placed",
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 2,
  pageSize: 3,
});

logger.info("Sorting and pagination awareness", {
  pageOne: pageOne.documents,
  pageTwo: pageTwo.documents,
  pageOneSummary: pageOne.summary,
  pageTwoSummary: pageTwo.summary,
  guidance: "Sorting and pagination should be designed together with the filter and likely index path, not bolted on separately.",
});
