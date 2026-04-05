import type { Clock, NotificationGateway, Subscription } from "../../shared/testing-types.js";

export class SubscriptionRenewalService {
  public constructor(
    private readonly clock: Clock,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  public daysUntilRenewal(subscription: Subscription): number {
    const millisecondsUntilRenewal = subscription.renewsAt.getTime() - this.clock.now().getTime();
    return Math.floor(millisecondsUntilRenewal / (24 * 60 * 60 * 1000));
  }

  public shouldSendReminder(subscription: Subscription): boolean {
    const daysUntilRenewal = this.daysUntilRenewal(subscription);

    return daysUntilRenewal >= 0 && daysUntilRenewal <= 3 && subscription.reminderSentAt === undefined;
  }

  public async sendReminderIfDue(
    subscription: Subscription,
  ): Promise<{ readonly status: "sent" | "not_due" | "retry_queued" }> {
    if (!this.shouldSendReminder(subscription)) {
      return { status: "not_due" };
    }

    try {
      await this.notificationGateway.sendRenewalReminder({
        tenantId: subscription.tenantId,
        subscriptionId: subscription.subscriptionId,
        daysUntilRenewal: this.daysUntilRenewal(subscription),
      });

      return { status: "sent" };
    } catch {
      return { status: "retry_queued" };
    }
  }
}
