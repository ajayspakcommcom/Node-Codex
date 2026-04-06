export interface OrderCreatedEvent {
  readonly messageId: string;
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
    messageId: `msg_${orderId}`,
    eventName: "order.created.v1",
    payload: {
      orderId,
      customerId,
    },
  };
}
