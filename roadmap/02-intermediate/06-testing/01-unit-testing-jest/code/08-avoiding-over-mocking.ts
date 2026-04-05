import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { FakeOrderRepository } from "./module/repositories/fake-order-repository.js";
import { OrderApplicationService } from "./module/services/order-application-service.js";
import { PricingService } from "./module/services/pricing-service.js";
import { QuoteRequestValidator } from "./module/validators/quote-request-validator.js";
import { SequenceIdGenerator, standardQuoteRequest } from "./shared/testing-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("Avoiding over-mocking", () => {
    it("asserts the business outcome instead of internal call choreography", async () => {
      const repository = new FakeOrderRepository();
      const service = new OrderApplicationService(
        repository,
        new PricingService(),
        new QuoteRequestValidator(),
        new SequenceIdGenerator("ord"),
      );

      const order = await service.createQuotedOrder("user_1", standardQuoteRequest);
      const storedOrders = await repository.list();

      expect(order.quote.totalCents).toBe(45_135);
      expect(storedOrders).toHaveLength(1);
    });
  });

  await run();
}

void main();
