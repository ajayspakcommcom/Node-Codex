import type { PaymentGateway, PaymentResult } from "../../shared/mocking-types.js";

export class MockPaymentGateway implements PaymentGateway {
  public readonly calls: Array<{
    readonly orderId: string;
    readonly customerId: string;
    readonly amountCents: number;
  }> = [];

  public constructor(private readonly response: PaymentResult) {}

  public async charge(input: {
    readonly orderId: string;
    readonly customerId: string;
    readonly amountCents: number;
  }): Promise<PaymentResult> {
    this.calls.push({ ...input });
    return this.response;
  }
}
