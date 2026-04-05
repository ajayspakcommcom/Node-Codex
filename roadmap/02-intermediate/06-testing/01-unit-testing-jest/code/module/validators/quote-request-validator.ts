import type { QuoteRequest } from "../../shared/testing-types.js";

export class QuoteRequestValidator {
  public validate(request: QuoteRequest): string[] {
    const errors: string[] = [];

    if (request.lines.length === 0) {
      errors.push("at least one line item is required");
    }

    if (!/^tenant_[a-z]+$/.test(request.tenantId)) {
      errors.push("tenant id format is invalid");
    }

    for (const line of request.lines) {
      if (line.quantity <= 0) {
        errors.push(`quantity must be positive for ${line.sku}`);
      }

      if (line.unitPriceCents <= 0) {
        errors.push(`unit price must be positive for ${line.sku}`);
      }
    }

    if (request.couponCode !== undefined && !/^[A-Z0-9]{4,10}$/.test(request.couponCode)) {
      errors.push("coupon code format is invalid");
    }

    return errors;
  }
}
