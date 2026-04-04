export interface InvoiceLineItem {
  readonly sku: string;
  readonly quantity: number;
  readonly unitPriceInCents: number;
}

export interface Invoice {
  readonly customerId: string;
  readonly lineItems: readonly InvoiceLineItem[];
}

export interface ChargeResult {
  readonly chargeId: string;
  readonly chargedAmountInCents: number;
}
