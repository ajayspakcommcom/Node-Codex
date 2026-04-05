import { describe, expect, it, reset, run } from "./shared/mock-test-lite.js";
import { CheckoutService } from "./module/services/checkout-service.js";
import { FakeOrderRepository } from "./module/doubles/fake-order-repository.js";
import { MockPaymentGateway } from "./module/doubles/mock-payment-gateway.js";
import { StubNotifier } from "./module/doubles/stub-notifier.js";
import { SpyAuditLogger } from "./module/doubles/spy-audit-logger.js";
import { pendingOrder, secondPendingOrder } from "./shared/mocking-runtime.js";

async function main(): Promise<void> {
  reset();

  describe("maintainable mocking patterns", () => {
    const cases = [
      {
        name: "approved payment marks the order as paid",
        order: pendingOrder,
        gatewayResult: { status: "approved", transactionId: "txn_301" } as const,
        expectedStatus: "paid",
      },
      {
        name: "declined payment marks the order as failed",
        order: secondPendingOrder,
        gatewayResult: { status: "declined", reason: "risk_rule" } as const,
        expectedStatus: "payment_failed",
      },
    ] as const;

    for (const testCase of cases) {
      it(testCase.name, async () => {
        const service = new CheckoutService(
          new FakeOrderRepository([testCase.order]),
          new MockPaymentGateway(testCase.gatewayResult),
          new StubNotifier(),
          new SpyAuditLogger(),
        );

        const order = await service.checkout(testCase.order.orderId);

        expect(order.status).toBe(testCase.expectedStatus);
      });
    }
  });

  await run();
}

void main();
