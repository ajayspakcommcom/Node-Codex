export interface PlaceOrderCommand {
  readonly orderId: string;
  readonly customerId: string;
  readonly totalInCents: number;
}

export class OrderAggregate {
  private constructor(
    readonly orderId: string,
    readonly customerId: string,
    readonly totalInCents: number,
    readonly status: "pending" | "confirmed",
  ) {}

  static place(command: PlaceOrderCommand): OrderAggregate {
    if (command.totalInCents <= 0) {
      throw new Error("order total must be positive");
    }

    return new OrderAggregate(
      command.orderId,
      command.customerId,
      command.totalInCents,
      "pending",
    );
  }

  confirm(): OrderAggregate {
    return new OrderAggregate(this.orderId, this.customerId, this.totalInCents, "confirmed");
  }
}
