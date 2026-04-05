import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { QuoteRequestValidator } from "./module/validators/quote-request-validator.js";

const validator = new QuoteRequestValidator();

async function main(): Promise<void> {
  reset();

  describe("QuoteRequestValidator", () => {
    it("returns readable errors for multiple invalid fields", () => {
      const errors = validator.validate({
        customerTier: "standard",
        couponCode: "bad-code",
        tenantId: "acme",
        lines: [{ sku: "plan_core", quantity: 0, unitPriceCents: -10 }],
      });

      expect(errors).toHaveLength(4);
      expect(errors).toContain("tenant id format is invalid");
      expect(errors).toContain("coupon code format is invalid");
    });

    it("accepts a valid minimal request", () => {
      const errors = validator.validate({
        customerTier: "standard",
        tenantId: "tenant_demo",
        lines: [{ sku: "plan_core", quantity: 1, unitPriceCents: 1_000 }],
      });

      expect(errors).toEqual([]);
    });
  });

  await run();
}

void main();
