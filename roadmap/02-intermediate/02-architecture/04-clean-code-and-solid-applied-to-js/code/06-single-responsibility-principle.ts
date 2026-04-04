import { logger } from "./shared/logger.js";
import { InvoiceService } from "./module/services/invoice-service.js";
import { InMemoryPaymentGateway } from "./module/infrastructure/payment-gateway.js";
import { DefaultTaxPolicy } from "./module/policies/tax-policy.js";
import { PriceCalculator } from "./module/services/price-calculator.js";

const invoiceService = new InvoiceService(
  new PriceCalculator(new DefaultTaxPolicy()),
  new InMemoryPaymentGateway(),
);

logger.info("Single Responsibility Principle example", {
  serviceName: invoiceService.constructor.name,
  responsibilities: [
    "InvoiceService orchestrates invoice charging",
    "PriceCalculator calculates totals",
    "TaxPolicy calculates tax",
    "PaymentGateway performs charging",
  ],
});
