import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { FakeOrderRepository } from "./module/repositories/fake-order-repository.js";
import { OrderApplicationService } from "./module/services/order-application-service.js";
import { PricingService } from "./module/services/pricing-service.js";
import { QuoteRequestValidator } from "./module/validators/quote-request-validator.js";
import { SequenceIdGenerator, standardQuoteRequest } from "./shared/testing-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("OrderApplicationService", () => {
    it("persists a priced order through a fake repository", async () => {
      const repository = new FakeOrderRepository();
      const service = new OrderApplicationService(
        repository,
        new PricingService(),
        new QuoteRequestValidator(),
        new SequenceIdGenerator("ord"),
      );

      const order = await service.createQuotedOrder("user_1", standardQuoteRequest);
      const storedOrder = await repository.findById(order.orderId);

      expect(order.orderId).toBe("ord_001");
      expect(storedOrder).toEqual(order);
    });
  });

  await run();
}

void main();
