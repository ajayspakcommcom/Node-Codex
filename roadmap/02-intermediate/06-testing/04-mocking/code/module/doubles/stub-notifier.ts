import type { Notifier } from "../../shared/mocking-types.js";

export class StubNotifier implements Notifier {
  public readonly failureNotifications: Array<{
    readonly orderId: string;
    readonly customerId: string;
    readonly reason: string;
  }> = [];

  public async notifyPaymentFailure(input: {
    readonly orderId: string;
    readonly customerId: string;
    readonly reason: string;
  }): Promise<void> {
    this.failureNotifications.push({ ...input });
  }
}
