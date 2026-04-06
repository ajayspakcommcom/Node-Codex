export interface LegacyBillingChargeCommand {
  readonly account_code: string;
  readonly invoice_reference: string;
  readonly charge_amount_minor: number;
  readonly charge_currency: string;
}
