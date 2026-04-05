import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("payment gateway mock", () => {
    it("verifies the payment request contract at the external boundary", async () => {
      const gateway = new MockPaymentGateway({ status: "approved", transactionId: "txn_101" });
      const service = new CheckoutService(
        new FakeOrderRepository([pendingOrder]),
        gateway,
        new StubNotifier(),
        new SpyAuditLogger(),
      );

      await service.checkout("ord_100");

      expect(gateway.calls).toEqual([
        {
          orderId: "ord_100",
          customerId: "customer_1",
          amountCents: 12_000,
        },
      ]);
    });
  });

  await run();
}

void main();
