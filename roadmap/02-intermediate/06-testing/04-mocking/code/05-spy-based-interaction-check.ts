import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("spy-based interaction checks", () => {
    it("verifies meaningful audit interactions without asserting every internal step", async () => {
      const auditLogger = new SpyAuditLogger();
      const service = new CheckoutService(
        new FakeOrderRepository([pendingOrder]),
        new MockPaymentGateway({ status: "approved", transactionId: "txn_200" }),
        new StubNotifier(),
        auditLogger,
      );

      await service.checkout("ord_100");

      expect(auditLogger.events).toEqual([
        { type: "payment_attempted", orderId: "ord_100" },
        { type: "payment_completed", orderId: "ord_100" },
      ]);
    });
  });

  await run();
}

void main();
