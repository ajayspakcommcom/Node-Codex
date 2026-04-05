import type { AuditLogger } from "../../shared/mocking-types.js";

export class SpyAuditLogger implements AuditLogger {
  public readonly events: Array<{
    readonly type: "payment_attempted" | "payment_failed" | "payment_completed";
    readonly orderId: string;
  }> = [];

  public async record(event: {
    readonly type: "payment_attempted" | "payment_failed" | "payment_completed";
    readonly orderId: string;
  }): Promise<void> {
    this.events.push({ ...event });
  }
}
