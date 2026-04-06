import { type EventEnvelope } from "./event-types";
import { type Logger } from "./logger";

type EventHandler = (event: EventEnvelope) => Promise<void>;

export class InMemoryEventBus {
  private readonly handlers = new Map<string, EventHandler[]>();

  constructor(private readonly logger: Logger) {}

  subscribe(eventName: string, handler: EventHandler): void {
    const existingHandlers = this.handlers.get(eventName) ?? [];
    existingHandlers.push(handler);
    this.handlers.set(eventName, existingHandlers);
  }

  async publish(event: EventEnvelope): Promise<void> {
    const handlers = this.handlers.get(event.eventName) ?? [];

    this.logger.info("event_published", {
      eventName: event.eventName,
      traceId: event.traceId,
      subscriberCount: handlers.length,
    });

    for (const handler of handlers) {
      await handler(event);
    }
  }
}
