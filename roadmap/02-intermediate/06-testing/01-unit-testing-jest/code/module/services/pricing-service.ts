import type { OrderQuote, QuoteRequest } from "../../shared/testing-types.js";

export class PricingService {
  public calculateQuote(request: QuoteRequest): OrderQuote {
    const subtotalCents = request.lines.reduce((sum, line) => sum + line.quantity * line.unitPriceCents, 0);
    const tierDiscountRate = this.getTierDiscountRate(request.customerTier);
    const couponDiscountRate = request.couponCode === "SAVE10" ? 0.1 : 0;
    const totalDiscountRate = Math.min(tierDiscountRate + couponDiscountRate, 0.25);

    const discountCents = Math.round(subtotalCents * totalDiscountRate);
    const taxedBaseCents = subtotalCents - discountCents;
    const taxCents = Math.round(taxedBaseCents * 0.18);

    return {
      subtotalCents,
      discountCents,
      taxCents,
      totalCents: taxedBaseCents + taxCents,
    };
  }

  private getTierDiscountRate(tier: QuoteRequest["customerTier"]): number {
    if (tier === "gold") {
      return 0.05;
    }

    if (tier === "enterprise") {
      return 0.1;
    }

    return 0;
  }
}
