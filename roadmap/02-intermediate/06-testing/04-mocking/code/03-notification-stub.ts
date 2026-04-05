import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("notification stub", () => {
    it("captures failure notifications without using a real provider", async () => {
      const notifier = new StubNotifier();
      const service = new CheckoutService(
        new FakeOrderRepository([pendingOrder]),
        new MockPaymentGateway({ status: "declined", reason: "insufficient_funds" }),
        notifier,
        new SpyAuditLogger(),
      );

      await service.checkout("ord_100");

      expect(notifier.failureNotifications).toEqual([
        {
          orderId: "ord_100",
          customerId: "customer_1",
          reason: "insufficient_funds",
        },
      ]);
    });
  });

  await run();
}

void main();
