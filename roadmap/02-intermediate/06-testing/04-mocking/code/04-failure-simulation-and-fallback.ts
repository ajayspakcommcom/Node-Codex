import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("failure simulation and fallback", () => {
    it("simulates a declined payment and verifies the fallback path", async () => {
      const repository = new FakeOrderRepository([pendingOrder]);
      const service = new CheckoutService(
        repository,
        new MockPaymentGateway({ status: "declined", reason: "card_blocked" }),
        new StubNotifier(),
        new SpyAuditLogger(),
      );

      const order = await service.checkout("ord_100");

      expect(order.status).toBe("payment_failed");
      expect(repository.list()[0]?.status).toBe("payment_failed");
    });
  });

  await run();
}

void main();
