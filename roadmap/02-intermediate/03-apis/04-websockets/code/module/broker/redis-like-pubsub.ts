type Subscriber = (roomName: string, event: string, payload: unknown) => void;

export class RedisLikePubSubBroker {
  private static readonly subscribers = new Set<Subscriber>();

  public subscribe(handler: Subscriber): void {
    RedisLikePubSubBroker.subscribers.add(handler);
  }

  public publish(roomName: string, event: string, payload: unknown): void {
    for (const subscriber of RedisLikePubSubBroker.subscribers) {
      subscriber(roomName, event, payload);
    }
  }
}
