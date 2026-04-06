import { createLogger } from "./shared/logger";
import { createEnvelope } from "./shared/message-types";

const logger = createLogger("schema-versioning");

const version1 = createEnvelope("order.created", {
  orderId: "ord_1",
  customerId: "cus_1",
});

const version2 = createEnvelope(
  "order.created",
  {
    orderId: "ord_2",
    customerId: "cus_1",
    salesChannel: "mobile-app",
  },
  2,
);

logger.info("schema_versions", {
  version1: version1.schemaVersion,
  version2: version2.schemaVersion,
  note: "Evolve contracts intentionally instead of silently changing payloads.",
});
