import type { OrderRow } from "../../shared/data-access-types.js";

export class OrderEntityModel {
  public constructor(private readonly row: OrderRow) {}

  public toJSON(): OrderRow {
    return { ...this.row };
  }

  public isHighValue(): boolean {
    return this.row.totalInCents >= 100_000;
  }

  public canBeRefunded(): boolean {
    return this.row.status === "placed";
  }

  public markRefunded(): OrderEntityModel {
    return new OrderEntityModel({
      ...this.row,
      status: "refunded",
    });
  }
}
