import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

interface AuditEvent {
  readonly eventType: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly timestamp: string;
}

function serializeAuditEvents(events: readonly AuditEvent[]): string {
  return JSON.stringify(events);
}

const payload = serializeAuditEvents([
  {
    eventType: "order.created",
    orderId: "ord_700",
    customerId: "cus_700",
    timestamp: new Date().toISOString(),
  },
]);

logger.info("serialization_hotspot_review", {
  payloadLength: payload.length,
  note: "Measure parse and stringify cost on real payload sizes before optimizing.",
});
