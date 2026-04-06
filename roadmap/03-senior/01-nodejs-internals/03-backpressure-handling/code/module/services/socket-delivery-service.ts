import type { SocketConsumer } from "../../shared/backpressure-types.js";

export class SocketDeliveryService {
  public tryDeliver(consumer: SocketConsumer): boolean {
    if (consumer.pendingMessages >= consumer.maxPendingMessages) {
      return false;
    }

    consumer.pendingMessages += 1;
    return true;
  }

  public acknowledge(consumer: SocketConsumer, count: number = 1): void {
    consumer.pendingMessages = Math.max(0, consumer.pendingMessages - count);
  }
}
