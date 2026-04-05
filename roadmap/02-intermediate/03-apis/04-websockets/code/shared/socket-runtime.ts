import type { RealtimeMetricsSnapshot } from "./socket-types.js";

export class RealtimeMetrics {
  private readonly deliveriesByScope = new Map<string, number>();
  private readonly reconnectsByUser = new Map<string, number>();
  private blockedDeliveries = 0;

  public recordDelivery(scope: string): void {
    this.increment(this.deliveriesByScope, scope);
  }

  public recordReconnect(userId: string): void {
    this.increment(this.reconnectsByUser, userId);
  }

  public recordBlockedDelivery(): void {
    this.blockedDeliveries += 1;
  }

  public snapshot(activeConnections: number, roomSizes: Readonly<Record<string, number>>): RealtimeMetricsSnapshot {
    return {
      activeConnections,
      roomSizes,
      deliveriesByScope: Object.fromEntries(this.deliveriesByScope),
      reconnectsByUser: Object.fromEntries(this.reconnectsByUser),
      blockedDeliveries: this.blockedDeliveries,
    };
  }

  private increment(counter: Map<string, number>, key: string): void {
    counter.set(key, (counter.get(key) ?? 0) + 1);
  }
}
