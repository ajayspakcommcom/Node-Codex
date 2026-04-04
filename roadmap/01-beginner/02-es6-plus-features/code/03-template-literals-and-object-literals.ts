import { createLogger } from "./shared/logger.js";

const service = "orders-service";
const requestId = "req_2001";
const orderId = "ord_901";

const logger = createLogger({ service, requestId });

const event = {
  service,
  requestId,
  orderId,
  message: `Preparing order ${orderId} for shipment`,
  buildAuditMessage(): string {
    return `${this.service}:${this.orderId}:${this.requestId}`;
  },
};

logger.info(event.message, { auditKey: event.buildAuditMessage() });
