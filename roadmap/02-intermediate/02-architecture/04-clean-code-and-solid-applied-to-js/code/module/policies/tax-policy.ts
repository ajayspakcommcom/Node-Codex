export interface TaxPolicy {
  calculateTax(totalInCents: number): number;
}

export class DefaultTaxPolicy implements TaxPolicy {
  public calculateTax(totalInCents: number): number {
    return Math.round(totalInCents * 0.18);
  }
}

export class ZeroTaxPolicy implements TaxPolicy {
  public calculateTax(_totalInCents: number): number {
    return 0;
  }
}
