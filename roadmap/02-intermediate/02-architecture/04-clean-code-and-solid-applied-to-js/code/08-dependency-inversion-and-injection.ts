import { logger } from "./shared/logger.js";
import { InvoiceService } from "./module/services/invoice-service.js";
import { InMemoryPaymentGateway, type PaymentGateway } from "./module/infrastructure/payment-gateway.js";
import { DefaultTaxPolicy } from "./module/policies/tax-policy.js";
import { PriceCalculator } from "./module/services/price-calculator.js";

class ReportingPaymentGateway implements PaymentGateway {
  public async charge(customerId: string, amountInCents: number) {
    return {
      chargeId: `reporting_${customerId}_${amountInCents}`,
      chargedAmountInCents: amountInCents,
    };
  }
}

async function run(): Promise<void> {
  const invoice = {
    customerId: "customer_2",
    lineItems: [
      {
        sku: "sku-2",
        quantity: 1,
        unitPriceInCents: 2500,
      },
    ],
  } as const;

  const calculator = new PriceCalculator(new DefaultTaxPolicy());
  const defaultGatewayService = new InvoiceService(calculator, new InMemoryPaymentGateway());
  const reportingGatewayService = new InvoiceService(calculator, new ReportingPaymentGateway());

  logger.info("Dependency inversion example", {
    defaultResult: await defaultGatewayService.chargeInvoice(invoice),
    reportingResult: await reportingGatewayService.chargeInvoice(invoice),
    guidance: "InvoiceService depends on the PaymentGateway contract, not one hardcoded infrastructure implementation.",
  });
}

void run();
