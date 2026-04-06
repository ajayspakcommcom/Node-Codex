import { type OrderEvent, type OrderSnapshot } from "./order-events.js";

export class OrderStream {
  private constructor(
    readonly orderId: string,
    readonly customerId: string,
    readonly totalInCents: number,
    readonly status: "pending" | "confirmed",
    readonly pendingEvents: readonly OrderEvent[],
  ) {}

  static create(orderId: string, customerId: string, totalInCents: number): OrderStream {
    if (totalInCents <= 0) {
      throw new Error("order total must be positive");
    }

    const event: OrderEvent = {
      type: "order-created",
      version: 1,
      payload: {
        orderId,
        customerId,
        totalInCents,
      },
    };

    return new OrderStream(orderId, customerId, totalInCents, "pending", [event]);
  }

  static replay(events: readonly OrderEvent[]): OrderStream {
    if (events.length === 0) {
      throw new Error("cannot replay empty event stream");
    }

    let currentOrderId = "";
    let currentCustomerId = "";
    let currentTotal = 0;
    let currentStatus: "pending" | "confirmed" = "pending";

    for (const event of events) {
      if (event.type === "order-created") {
        currentOrderId = event.payload.orderId;
        currentCustomerId = event.payload.customerId;
        currentTotal = event.payload.totalInCents;
        currentStatus = "pending";
      }

      if (event.type === "order-confirmed") {
        currentStatus = "confirmed";
      }
    }

    return new OrderStream(currentOrderId, currentCustomerId, currentTotal, currentStatus, []);
  }

  static restore(snapshot: OrderSnapshot, laterEvents: readonly OrderEvent[]): OrderStream {
    const restored = new OrderStream(
      snapshot.orderId,
      snapshot.customerId,
      snapshot.totalInCents,
      snapshot.status,
      [],
    );

    if (laterEvents.length === 0) {
      return restored;
    }

    return OrderStream.replay([
      {
        type: "order-created",
        version: 1,
        payload: {
          orderId: snapshot.orderId,
          customerId: snapshot.customerId,
          totalInCents: snapshot.totalInCents,
        },
      },
      ...(snapshot.status === "confirmed"
        ? [
            {
              type: "order-confirmed",
              version: 1,
              payload: { orderId: snapshot.orderId },
            } satisfies OrderEvent,
          ]
        : []),
      ...laterEvents,
    ]);
  }

  confirm(): OrderStream {
    if (this.status === "confirmed") {
      return this;
    }

    const event: OrderEvent = {
      type: "order-confirmed",
      version: 1,
      payload: {
        orderId: this.orderId,
      },
    };

    return new OrderStream(
      this.orderId,
      this.customerId,
      this.totalInCents,
      "confirmed",
      [...this.pendingEvents, event],
    );
  }

  toSnapshot(): OrderSnapshot {
    return {
      orderId: this.orderId,
      customerId: this.customerId,
      totalInCents: this.totalInCents,
      status: this.status,
    };
  }
}
