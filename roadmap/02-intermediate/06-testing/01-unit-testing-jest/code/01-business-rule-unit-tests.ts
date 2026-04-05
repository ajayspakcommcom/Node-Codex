import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { PricingService } from "./module/services/pricing-service.js";
import { standardQuoteRequest } from "./shared/testing-runtime.js";

const pricingService = new PricingService();

async function main(): Promise<void> {
  reset();

  describe("PricingService", () => {
    it("applies tier and coupon discounts deterministically", () => {
      const quote = pricingService.calculateQuote(standardQuoteRequest);

      expect(quote).toEqual({
        subtotalCents: 45_000,
        discountCents: 6_750,
        taxCents: 6_885,
        totalCents: 45_135,
      });
    });

    it("caps combined discounts to avoid accidental over-discounting", () => {
      const quote = pricingService.calculateQuote({
        ...standardQuoteRequest,
        customerTier: "enterprise",
        couponCode: "SAVE10",
      });

      expect(quote.discountCents).toBe(9_000);
      expect(quote.totalCents).toBe(42_480);
    });
  });

  await run();
}

void main();
