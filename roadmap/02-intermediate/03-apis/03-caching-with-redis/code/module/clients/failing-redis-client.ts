import type { CacheClient } from "../../shared/cache-types.js";

export class RedisUnavailableError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "RedisUnavailableError";
  }
}

export class FailingRedisClient implements CacheClient {
  public async get(_key: string): Promise<string | undefined> {
    throw new RedisUnavailableError("Redis is currently unavailable.");
  }

  public async set(_key: string, _value: string, _ttlMs: number): Promise<void> {
    throw new RedisUnavailableError("Redis is currently unavailable.");
  }

  public async delete(_key: string): Promise<void> {
    throw new RedisUnavailableError("Redis is currently unavailable.");
  }
}
