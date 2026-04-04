import { logger } from "./shared/logger.js";
import { InvoiceService } from "./module/services/invoice-service.js";
import { InMemoryPaymentGateway } from "./module/infrastructure/payment-gateway.js";
import { DefaultTaxPolicy } from "./module/policies/tax-policy.js";
import { PriceCalculator } from "./module/services/price-calculator.js";

const composedService = new InvoiceService(
  new PriceCalculator(new DefaultTaxPolicy()),
  new InMemoryPaymentGateway(),
);

logger.info("Composition over inheritance", {
  composedService: composedService.constructor.name,
  guidance: "Composition keeps behavior explicit by assembling small collaborators instead of building deep inheritance hierarchies.",
});
