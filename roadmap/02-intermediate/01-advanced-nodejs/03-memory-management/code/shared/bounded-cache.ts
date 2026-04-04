interface CacheEntry<TValue> {
  readonly value: TValue;
  readonly insertedAt: number;
}

export class BoundedCache<TValue> {
  private readonly entries = new Map<string, CacheEntry<TValue>>();

  public constructor(
    private readonly maxEntries: number,
    private readonly ttlMs: number,
  ) {}

  public set(key: string, value: TValue): void {
    this.evictExpiredEntries();

    if (this.entries.size >= this.maxEntries) {
      const oldestKey = this.entries.keys().next().value;
      if (oldestKey !== undefined) {
        this.entries.delete(oldestKey);
      }
    }

    this.entries.set(key, {
      value,
      insertedAt: Date.now(),
    });
  }

  public get(key: string): TValue | undefined {
    this.evictExpiredEntries();
    return this.entries.get(key)?.value;
  }

  public size(): number {
    this.evictExpiredEntries();
    return this.entries.size;
  }

  private evictExpiredEntries(): void {
    const now = Date.now();

    for (const [key, entry] of this.entries.entries()) {
      if (now - entry.insertedAt > this.ttlMs) {
        this.entries.delete(key);
      }
    }
  }
}
