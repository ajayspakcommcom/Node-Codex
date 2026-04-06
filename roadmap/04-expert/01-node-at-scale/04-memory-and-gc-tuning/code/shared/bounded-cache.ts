export class BoundedCache<TKey, TValue> {
  private readonly store = new Map<TKey, TValue>();

  constructor(private readonly maxEntries: number) {}

  set(key: TKey, value: TValue): void {
    if (this.store.has(key)) {
      this.store.delete(key);
    }

    this.store.set(key, value);

    if (this.store.size > this.maxEntries) {
      const oldestKey = this.store.keys().next().value as TKey;
      this.store.delete(oldestKey);
    }
  }

  get(key: TKey): TValue | undefined {
    return this.store.get(key);
  }

  size(): number {
    return this.store.size;
  }

  keys(): TKey[] {
    return Array.from(this.store.keys());
  }
}
