import type { ChargeResult, Invoice } from "../../shared/types.js";
import type { PaymentGateway } from "../infrastructure/payment-gateway.js";
import type { PriceCalculator } from "./price-calculator.js";

export interface InvoiceChargeSummary {
  readonly customerId: string;
  readonly subtotalInCents: number;
  readonly taxInCents: number;
  readonly totalInCents: number;
  readonly chargeId: string;
}

export class InvoiceService {
  public constructor(
    private readonly priceCalculator: PriceCalculator,
    private readonly paymentGateway: PaymentGateway,
  ) {}

  public async chargeInvoice(invoice: Invoice): Promise<InvoiceChargeSummary> {
    if (invoice.lineItems.length === 0) {
      throw new Error("Invoice must contain at least one line item.");
    }

    const totals = this.priceCalculator.calculate(invoice);
    const chargeResult: ChargeResult = await this.paymentGateway.charge(invoice.customerId, totals.totalInCents);

    return {
      customerId: invoice.customerId,
      subtotalInCents: totals.subtotalInCents,
      taxInCents: totals.taxInCents,
      totalInCents: totals.totalInCents,
      chargeId: chargeResult.chargeId,
    };
  }
}
