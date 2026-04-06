import { type OrderEvent } from "../domain/order-events.js";

export class InMemoryEventStore {
  private readonly streams = new Map<string, OrderEvent[]>();

  append(streamId: string, events: readonly OrderEvent[]): void {
    const existing = this.streams.get(streamId) ?? [];
    this.streams.set(streamId, [...existing, ...events]);
  }

  load(streamId: string): readonly OrderEvent[] {
    return this.streams.get(streamId) ?? [];
  }
}
