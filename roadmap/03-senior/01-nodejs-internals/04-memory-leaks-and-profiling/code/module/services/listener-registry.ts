export class ListenerRegistry {
  private readonly listeners = new Map<string, number>();

  public add(eventName: string): void {
    this.listeners.set(eventName, (this.listeners.get(eventName) ?? 0) + 1);
  }

  public snapshot(): Readonly<Record<string, number>> {
    return Object.fromEntries(this.listeners);
  }
}
