type BrokerListener = (roomId: string, event: string, payload: unknown) => void;

export class RedisLikeChatBroker {
  private readonly listeners = new Set<BrokerListener>();

  public subscribe(listener: BrokerListener): void {
    this.listeners.add(listener);
  }

  public publish(roomId: string, event: string, payload: unknown): void {
    for (const listener of this.listeners) {
      listener(roomId, event, payload);
    }
  }
}
