import type { CacheClient } from "../../shared/cache-types.js";

interface StoredValue {
  value: string;
  expiresAtEpochMs: number;
}

export class RedisLikeClient implements CacheClient {
  private static readonly storage = new Map<string, StoredValue>();

  public async get(key: string): Promise<string | undefined> {
    const now = Date.now();
    const record = RedisLikeClient.storage.get(key);

    if (record === undefined) {
      return undefined;
    }

    if (record.expiresAtEpochMs <= now) {
      RedisLikeClient.storage.delete(key);
      return undefined;
    }

    return record.value;
  }

  public async set(key: string, value: string, ttlMs: number): Promise<void> {
    RedisLikeClient.storage.set(key, {
      value,
      expiresAtEpochMs: Date.now() + ttlMs,
    });
  }

  public async delete(key: string): Promise<void> {
    RedisLikeClient.storage.delete(key);
  }
}
