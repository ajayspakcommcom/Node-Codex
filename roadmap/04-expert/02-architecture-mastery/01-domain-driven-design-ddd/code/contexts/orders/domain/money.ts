export class Money {
  private constructor(
    readonly amountInCents: number,
    readonly currency: string,
  ) {}

  static fromCents(amountInCents: number, currency: string): Money {
    if (amountInCents < 0) {
      throw new Error("money cannot be negative");
    }

    return new Money(amountInCents, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("currency mismatch");
    }

    return new Money(this.amountInCents + other.amountInCents, this.currency);
  }

  multiply(multiplier: number): Money {
    return new Money(this.amountInCents * multiplier, this.currency);
  }

  toJSON() {
    return {
      amountInCents: this.amountInCents,
      currency: this.currency,
    };
  }
}
