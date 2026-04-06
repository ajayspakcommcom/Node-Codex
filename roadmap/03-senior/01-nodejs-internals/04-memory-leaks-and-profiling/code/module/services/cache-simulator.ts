import type { RetentionSubject } from "../../shared/memory-types.js";

export class CacheSimulator {
  private readonly store = new Map<string, string>();

  public constructor(private readonly bounded: boolean, private readonly maxEntries: number = 50) {}

  public insert(key: string, payload: string): void {
    this.store.set(key, payload);

    if (this.bounded && this.store.size > this.maxEntries) {
      const oldestKey = this.store.keys().next().value;

      if (oldestKey !== undefined) {
        this.store.delete(oldestKey);
      }
    }
  }

  public toRetentionSubject(name: string): RetentionSubject {
    return {
      name,
      retainedObjects: this.store.size,
      growthTrend: this.bounded ? "stable" : "growing",
      bounded: this.bounded,
    };
  }
}
