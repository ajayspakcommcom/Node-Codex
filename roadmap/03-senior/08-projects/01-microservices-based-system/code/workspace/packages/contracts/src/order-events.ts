export interface OrderCreatedEvent {
  readonly eventName: "order.created.v1";
  readonly payload: {
    readonly orderId: string;
    readonly customerId: string;
  };
}

export function createOrderCreatedEvent(
  orderId: string,
  customerId: string,
): OrderCreatedEvent {
  return {
    eventName: "order.created.v1",
    payload: {
      orderId,
      customerId,
    },
  };
}
