import type { Invoice } from "../../shared/types.js";
import type { TaxPolicy } from "../policies/tax-policy.js";

export interface InvoiceTotals {
  readonly subtotalInCents: number;
  readonly taxInCents: number;
  readonly totalInCents: number;
}

export class PriceCalculator {
  public constructor(private readonly taxPolicy: TaxPolicy) {}

  public calculate(invoice: Invoice): InvoiceTotals {
    const subtotalInCents = invoice.lineItems.reduce(
      (runningTotal, lineItem) => runningTotal + lineItem.quantity * lineItem.unitPriceInCents,
      0,
    );
    const taxInCents = this.taxPolicy.calculateTax(subtotalInCents);

    return {
      subtotalInCents,
      taxInCents,
      totalInCents: subtotalInCents + taxInCents,
    };
  }
}
