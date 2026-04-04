export interface ChargeInput {
  readonly invoiceId: string;
  readonly amount: number;
  readonly currency?: string;
}

export interface ChargeResult {
  readonly invoiceId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: "accepted";
}
