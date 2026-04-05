import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { FakeOrderRepository } from "./module/repositories/fake-order-repository.js";
import { OrderApplicationService } from "./module/services/order-application-service.js";
import { PricingService } from "./module/services/pricing-service.js";
import { QuoteRequestValidator } from "./module/validators/quote-request-validator.js";
import type { IdGenerator } from "./shared/testing-types.js";
import { standardQuoteRequest } from "./shared/testing-runtime.js";

const deterministicIds: IdGenerator = {
  nextId(): string {
    return "ord_fixed_001";
  },
};

async function main(): Promise<void> {
  reset();

  describe("Deterministic collaborators", () => {
    it("keeps tests stable by injecting id generation", async () => {
      const service = new OrderApplicationService(
        new FakeOrderRepository(),
        new PricingService(),
        new QuoteRequestValidator(),
        deterministicIds,
      );

      const order = await service.createQuotedOrder("user_9", standardQuoteRequest);

      expect(order.orderId).toBe("ord_fixed_001");
    });
  });

  await run();
}

void main();
