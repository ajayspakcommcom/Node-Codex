import { logger } from "./shared/logger.js";
import { PriceCalculator } from "./module/services/price-calculator.js";
import { DefaultTaxPolicy, ZeroTaxPolicy } from "./module/policies/tax-policy.js";

const sampleInvoice = {
  customerId: "customer_1",
  lineItems: [
    {
      sku: "sku-1",
      quantity: 2,
      unitPriceInCents: 1000,
    },
  ],
} as const;

const defaultTax = new PriceCalculator(new DefaultTaxPolicy()).calculate(sampleInvoice);
const zeroTax = new PriceCalculator(new ZeroTaxPolicy()).calculate(sampleInvoice);

logger.info("Open/Closed Principle example", {
  defaultTax,
  zeroTax,
  guidance: "Behavior changes by extending TaxPolicy implementations rather than rewriting PriceCalculator.",
});
