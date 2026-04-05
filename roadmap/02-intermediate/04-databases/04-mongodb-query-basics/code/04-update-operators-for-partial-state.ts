import { InMemoryMongoCollection } from "./module/engine/in-memory-mongo-collection.js";
import { exampleOrders } from "./shared/mongo-runtime.js";
import { logger } from "./shared/logger.js";

const collection = new InMemoryMongoCollection(exampleOrders);
const updated = collection.updateOne(
  { _id: "ord_2002" },
  {
    $set: {
      status: "cancelled",
      "shipping.priority": "express",
    },
    $inc: {
      "metrics.retryCount": 1,
    },
    $push: {
      tags: "customer-cancelled",
    },
  },
);

logger.info("Update operators for partial state", {
  updatedDocument: updated,
  guidance: "Targeted update operators are usually safer than replacing whole documents when only part of the state should change.",
});
