import { type LegacyBillingChargeCommand } from "../contracts/legacy-billing.js";

export interface ChargeOrderInput {
  readonly orderId: string;
  readonly customerId: string;
  readonly amountInCents: number;
  readonly currency: string;
}

export interface LegacyChargeGateway {
  charge(input: ChargeOrderInput): Promise<void>;
}

export class LegacyBillingAdapter implements LegacyChargeGateway {
  translateOrderCharge(input: ChargeOrderInput): LegacyBillingChargeCommand {
    return {
      account_code: input.customerId,
      invoice_reference: input.orderId,
      charge_amount_minor: input.amountInCents,
      charge_currency: input.currency,
    };
  }

  async charge(input: ChargeOrderInput): Promise<void> {
    const command = this.translateOrderCharge(input);
    void command;
  }
}
