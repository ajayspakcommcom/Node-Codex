import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const collection = new InMemoryMongoCollection(exampleOrders);
const result = collection.find(
  {
    tenantId: "tenant_alpha",
    status: "placed",
    channel: "web",
  },
  {
    projection: ["_id", "status", "channel", "totalInCents", "createdAt"],
    sort: { createdAt: -1 },
  },
);

logger.info("Find and filter basics", {
  queryResult: result.documents,
  summary: result.summary,
  guidance: "Enterprise query fluency starts with clear filters that reflect the business rule and a projection that serves the endpoint without returning the whole document.",
});
