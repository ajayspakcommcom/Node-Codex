import type { CachedValue } from "../../shared/api-cache-types.js";

export class RedisLikeClient {
  private readonly store = new Map<string, CachedValue<unknown>>();

  public async get<TValue>(key: string, nowEpochSeconds: number): Promise<TValue | undefined> {
    const cached = this.store.get(key);

    if (cached === undefined) {
      return undefined;
    }

    if (cached.expiresAtEpochSeconds <= nowEpochSeconds) {
      this.store.delete(key);
      return undefined;
    }

    return cached.value as TValue;
  }

  public async set<TValue>(key: string, value: TValue, expiresAtEpochSeconds: number): Promise<void> {
    this.store.set(key, {
      value,
      expiresAtEpochSeconds,
    });
  }

  public async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  public snapshotKeys(): readonly string[] {
    return [...this.store.keys()].sort();
  }
}
