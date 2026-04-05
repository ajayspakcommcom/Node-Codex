import { describe, expect, it, reset, run } from "./shared/integration-test-lite.js";
import { Application } from "./module/http/application.js";
import { InMemoryDatabase } from "./module/db/in-memory-database.js";
import { buildCreateOrderRequest, seededOrders } from "./shared/integration-runtime.js";
import type { DomainEventPublisher } from "./shared/integration-types.js";

const silentPublisher: DomainEventPublisher = {
  async publish(): Promise<void> {},
};

async function main(): Promise<void> {
  reset();

  describe("maintainable integration patterns", () => {
    const cases = [
      {
        name: "valid create request returns 201",
        request: buildCreateOrderRequest(),
        expectedStatus: 201,
      },
      {
        name: "invalid payload returns 403",
        request: buildCreateOrderRequest({
          body: { sku: "plan_support", quantity: 0, unitPriceCents: 5_000 },
        }),
        expectedStatus: 403,
      },
    ] as const;

    for (const testCase of cases) {
      it(testCase.name, async () => {
        const app = new Application(new InMemoryDatabase(seededOrders), silentPublisher);
        const response = await app.handle(testCase.request);

        expect(response.statusCode).toBe(testCase.expectedStatus);
      });
    }
  });

  await run();
}

void main();
