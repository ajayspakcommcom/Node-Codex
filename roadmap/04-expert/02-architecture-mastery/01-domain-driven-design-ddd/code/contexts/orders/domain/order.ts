import { Money } from "./money.js";
import { Quantity } from "./quantity.js";

export interface PlaceOrderInput {
  readonly orderId: string;
  readonly customerId: string;
  readonly items: ReadonlyArray<{
    readonly sku: string;
    readonly quantity: number;
    readonly unitPriceInCents: number;
  }>;
  readonly currency: string;
}

interface OrderLine {
  readonly sku: string;
  readonly quantity: Quantity;
  readonly unitPrice: Money;
}

export class Order {
  private constructor(
    readonly orderId: string,
    readonly customerId: string,
    private readonly lines: readonly OrderLine[],
    readonly status: "pending-payment" | "confirmed",
  ) {}

  static place(input: PlaceOrderInput): Order {
    if (input.items.length === 0) {
      throw new Error("an order must contain at least one item");
    }

    const lines = input.items.map((item) => ({
      sku: item.sku,
      quantity: Quantity.of(item.quantity),
      unitPrice: Money.fromCents(item.unitPriceInCents, input.currency),
    }));

    return new Order(input.orderId, input.customerId, lines, "pending-payment");
  }

  total(): Money {
    return this.lines.reduce(
      (accumulator, line) => accumulator.add(line.unitPrice.multiply(line.quantity.value)),
      Money.fromCents(0, this.lines[0]?.unitPrice.currency ?? "INR"),
    );
  }

  confirm(): Order {
    if (this.status === "confirmed") {
      return this;
    }

    return new Order(this.orderId, this.customerId, this.lines, "confirmed");
  }
}
