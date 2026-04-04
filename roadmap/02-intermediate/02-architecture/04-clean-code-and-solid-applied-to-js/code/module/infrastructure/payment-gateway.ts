import type { ChargeResult } from "../../shared/types.js";

export interface PaymentGateway {
  charge(customerId: string, amountInCents: number): Promise<ChargeResult>;
}

export class InMemoryPaymentGateway implements PaymentGateway {
  public async charge(customerId: string, amountInCents: number): Promise<ChargeResult> {
    return {
      chargeId: `charge_${customerId}_${amountInCents}`,
      chargedAmountInCents: amountInCents,
    };
  }
}
