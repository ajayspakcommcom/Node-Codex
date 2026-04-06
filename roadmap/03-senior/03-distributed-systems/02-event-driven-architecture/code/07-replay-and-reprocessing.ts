import { createEventEnvelope, type EventEnvelope } from "./shared/event-types";
import { createLogger } from "./shared/logger";

const logger = createLogger("replay");

class AnalyticsProjector {
  private totals = 0;

  rebuild(events: readonly EventEnvelope[]): void {
    this.totals = 0;

    for (const event of events) {
      if (event.eventName === "invoice.paid") {
        this.totals += Number(event.payload.amount);
      }
    }
  }

  getTotal(): number {
    return this.totals;
  }
}

const events = [
  createEventEnvelope("invoice.paid", { amount: 100 }),
  createEventEnvelope("invoice.paid", { amount: 250 }),
];

const projector = new AnalyticsProjector();
projector.rebuild(events);

logger.info("rebuild_complete", {
  totalRevenue: projector.getTotal(),
  note: "Replay enables read-model rebuilds and backfills when event history exists.",
});
