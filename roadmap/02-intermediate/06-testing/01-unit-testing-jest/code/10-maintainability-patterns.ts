import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { PricingService } from "./module/services/pricing-service.js";
import type { CustomerTier } from "./shared/testing-types.js";

const pricingService = new PricingService();

async function main(): Promise<void> {
  reset();

  describe("Table-driven maintainability pattern", () => {
    const cases: readonly {
      readonly tier: CustomerTier;
      readonly expectedDiscountCents: number;
    }[] = [
      { tier: "standard", expectedDiscountCents: 0 },
      { tier: "gold", expectedDiscountCents: 500 },
      { tier: "enterprise", expectedDiscountCents: 1_000 },
    ];

    for (const testCase of cases) {
      it(`applies the correct base discount for ${testCase.tier}`, () => {
        const quote = pricingService.calculateQuote({
          customerTier: testCase.tier,
          tenantId: "tenant_demo",
          lines: [{ sku: "sku_1", quantity: 1, unitPriceCents: 10_000 }],
        });

        expect(quote.discountCents).toBe(testCase.expectedDiscountCents);
      });
    }
  });

  await run();
}

void main();
