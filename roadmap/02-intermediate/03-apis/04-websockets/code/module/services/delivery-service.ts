import type { SocketConnection, SocketMessage } from "../../shared/socket-types.js";

export class DeliveryService {
  public constructor(private readonly maxPendingDeliveries: number) {}

  public deliver(connection: SocketConnection, message: SocketMessage): boolean {
    if (connection.pendingDeliveryCount >= this.maxPendingDeliveries) {
      return false;
    }

    connection.deliveryLog.push(message);
    connection.pendingDeliveryCount += 1;
    connection.lastSeenAt = new Date().toISOString();
    return true;
  }

  public acknowledge(connection: SocketConnection, count: number = 1): void {
    connection.pendingDeliveryCount = Math.max(0, connection.pendingDeliveryCount - count);
  }
}
