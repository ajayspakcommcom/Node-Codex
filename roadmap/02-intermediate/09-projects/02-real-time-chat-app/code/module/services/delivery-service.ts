import { chatRuntime } from "../../shared/chat-runtime.js";
import type { ChatConnection, ChatEnvelope } from "../../shared/chat-types.js";

export class DeliveryService {
  public deliver(connection: ChatConnection, envelope: ChatEnvelope): boolean {
    if (connection.pendingDeliveryCount >= chatRuntime.maxPendingDeliveries) {
      return false;
    }

    connection.deliveryLog.push(envelope);
    connection.pendingDeliveryCount += 1;
    connection.lastSeenAtEpochSeconds = Math.max(connection.lastSeenAtEpochSeconds, envelope.sequence + connection.connectedAtEpochSeconds);
    return true;
  }

  public acknowledge(connection: ChatConnection, count: number = 1): void {
    connection.pendingDeliveryCount = Math.max(0, connection.pendingDeliveryCount - count);
  }
}
