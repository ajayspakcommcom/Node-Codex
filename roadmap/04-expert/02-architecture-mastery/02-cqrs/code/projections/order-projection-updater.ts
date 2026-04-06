import { type OrderReadProjection, OrderProjectionStore } from "../read-model/order-projection-store.js";

interface OrderProjectionEvent {
  readonly eventType: "order.confirmed";
  readonly orderId: string;
  readonly customerId: string;
  readonly totalInCents: number;
}

export class OrderProjectionUpdater {
  constructor(private readonly projectionStore: OrderProjectionStore) {}

  apply(event: OrderProjectionEvent): void {
    const projection: OrderReadProjection = {
      orderId: event.orderId,
      customerId: event.customerId,
      totalInCents: event.totalInCents,
      status: "confirmed",
    };

    this.projectionStore.upsert(projection);
  }
}
