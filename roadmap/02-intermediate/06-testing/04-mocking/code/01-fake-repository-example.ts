import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("fake repository example", () => {
    it("uses a fake repository to keep stateful behavior realistic", async () => {
      const repository = new FakeOrderRepository([pendingOrder]);
      const service = new CheckoutService(
        repository,
        new MockPaymentGateway({ status: "approved", transactionId: "txn_100" }),
        new StubNotifier(),
        new SpyAuditLogger(),
      );

      const order = await service.checkout("ord_100");

      expect(order.status).toBe("paid");
      expect(repository.list()).toHaveLength(1);
      expect(repository.list()[0]?.status).toBe("paid");
    });
  });

  await run();
}

void main();
