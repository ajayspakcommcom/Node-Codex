import { describe, expect, it, reset, run } from "./shared/jest-lite.js";
import { SubscriptionRenewalService } from "./module/services/subscription-renewal-service.js";
import { FixedClock, sampleSubscription } from "./shared/testing-runtime.js";
import type { NotificationGateway } from "./shared/testing-types.js";

const silentGateway: NotificationGateway = {
  async sendRenewalReminder(): Promise<void> {},
};

async function main(): Promise<void> {
  reset();

  describe("SubscriptionRenewalService", () => {
    it("sends reminders only inside the renewal window", async () => {
      const service = new SubscriptionRenewalService(new FixedClock(new Date("2026-04-05T09:00:00.000Z")), silentGateway);

      expect(service.shouldSendReminder(sampleSubscription)).toBe(true);
      expect(await service.sendReminderIfDue(sampleSubscription)).toEqual({ status: "sent" });
    });

    it("stays deterministic because the clock is injected", () => {
      const service = new SubscriptionRenewalService(new FixedClock(new Date("2026-04-01T09:00:00.000Z")), silentGateway);

      expect(service.daysUntilRenewal(sampleSubscription)).toBe(7);
      expect(service.shouldSendReminder(sampleSubscription)).toBe(false);
    });
  });

  await run();
}

void main();
