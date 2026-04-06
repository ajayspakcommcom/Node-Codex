import { type OrderEvent } from "../domain/order-events.js";

export interface OrderProjection {
  readonly orderId: string;
  readonly customerId: string;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
}

export class OrderProjectionBuilder {
  build(events: readonly OrderEvent[]): OrderProjection {
    if (events.length === 0) {
      throw new Error("projection requires at least one event");
    }

    let projection: OrderProjection | undefined;

    for (const event of events) {
      if (event.type === "order-created") {
        projection = {
          orderId: event.payload.orderId,
          customerId: event.payload.customerId,
          totalInCents: event.payload.totalInCents,
          status: "pending",
        };
      }

      if (event.type === "order-confirmed" && projection) {
        projection = {
          ...projection,
          status: "confirmed",
        };
      }
    }

    if (!projection) {
      throw new Error("projection could not be built");
    }

    return projection;
  }
}
