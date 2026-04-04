import { logger } from "./shared/logger.js";
import { InvoiceService } from "./module/services/invoice-service.js";
import { InMemoryPaymentGateway } from "./module/infrastructure/payment-gateway.js";
import { DefaultTaxPolicy } from "./module/policies/tax-policy.js";
import { PriceCalculator } from "./module/services/price-calculator.js";

class BillingModule {
  public readonly taxPolicy = new DefaultTaxPolicy();
  public readonly priceCalculator = new PriceCalculator(this.taxPolicy);
  public readonly paymentGateway = new InMemoryPaymentGateway();
  public readonly invoiceService = new InvoiceService(this.priceCalculator, this.paymentGateway);
}

const module = new BillingModule();

const summary = await module.invoiceService.chargeInvoice({
  customerId: "customer_3",
  lineItems: [
    {
      sku: "sku-3",
      quantity: 2,
      unitPriceInCents: 3000,
    },
  ],
});

logger.info("Maintainability pattern example", {
  summary,
  rule: "Use explicit collaborators, cohesive modules, and clear names so future changes stay localized and understandable.",
});
