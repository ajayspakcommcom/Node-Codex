export class Quantity {
  private constructor(readonly value: number) {}

  static of(value: number): Quantity {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("quantity must be a positive integer");
    }

    return new Quantity(value);
  }
}
