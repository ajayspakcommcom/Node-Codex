import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { SubscriptionRenewalService } from "./module/services/subscription-renewal-service.js";
import { FixedClock, sampleSubscription } from "./shared/testing-runtime.js";
import type { NotificationGateway } from "./shared/testing-types.js";

const failingGateway: NotificationGateway = {
  async sendRenewalReminder(): Promise<void> {
    throw new Error("smtp timeout");
  },
};

async function main(): Promise<void> {
  reset();

  describe("SubscriptionRenewalService failure handling", () => {
    it("returns a retry decision instead of crashing the unit", async () => {
      const service = new SubscriptionRenewalService(
        new FixedClock(new Date("2026-04-05T09:00:00.000Z")),
        failingGateway,
      );

      const result = await service.sendReminderIfDue(sampleSubscription);

      expect(result).toEqual({ status: "retry_queued" });
    });
  });

  await run();
}

void main();
