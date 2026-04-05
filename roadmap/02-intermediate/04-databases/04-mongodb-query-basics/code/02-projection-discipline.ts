import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const collection = new InMemoryMongoCollection(exampleOrders);
const fullDocumentResult = collection.find(
  { tenantId: "tenant_alpha", status: "placed" },
  { limit: 2 },
);
const projectedResult = collection.find(
  { tenantId: "tenant_alpha", status: "placed" },
  {
    projection: ["_id", "status", "totalInCents", "shipping.city"],
    limit: 2,
  },
);

logger.info("Projection discipline", {
  fullDocumentSummary: fullDocumentResult.summary,
  projectedSummary: projectedResult.summary,
  fullDocumentSample: fullDocumentResult.documents[0],
  projectedSample: projectedResult.documents[0],
  guidance: "Projection keeps read-heavy endpoints tighter by returning only the fields the consumer actually needs.",
});
