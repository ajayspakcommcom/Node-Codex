import { createEventEnvelope } from "./shared/event-types";
import { createLogger } from "./shared/logger";

const logger = createLogger("consumer-safety");

class ShipmentProjection {
  private readonly processed = new Set<string>();
  private status: "unknown" | "requested" | "shipped" = "unknown";

  handle(event: ReturnType<typeof createEventEnvelope>): void {
    if (this.processed.has(event.messageId)) {
      logger.info("duplicate_skipped", { messageId: event.messageId });
      return;
    }

    this.processed.add(event.messageId);

    if (event.eventName === "shipment.requested" && this.status === "shipped") {
      logger.info("out_of_order_ignored", {
        eventName: event.eventName,
        currentStatus: this.status,
      });
      return;
    }

    if (event.eventName === "shipment.requested") {
      this.status = "requested";
    }

    if (event.eventName === "shipment.shipped") {
      this.status = "shipped";
    }

    logger.info("projection_updated", { status: this.status });
  }
}

const projection = new ShipmentProjection();
const requested = createEventEnvelope("shipment.requested", { shipmentId: "sh_1" });
const shipped = createEventEnvelope("shipment.shipped", { shipmentId: "sh_1" });

projection.handle(shipped);
projection.handle(requested);
projection.handle(shipped);
