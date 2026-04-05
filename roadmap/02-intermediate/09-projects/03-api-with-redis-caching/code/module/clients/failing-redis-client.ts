export class RedisUnavailableError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "RedisUnavailableError";
  }
}

export class FailingRedisClient {
  public async get(): Promise<never> {
    throw new RedisUnavailableError("Redis is unavailable for reads.");
  }

  public async set(): Promise<never> {
    throw new RedisUnavailableError("Redis is unavailable for writes.");
  }

  public async delete(): Promise<never> {
    throw new RedisUnavailableError("Redis is unavailable for deletes.");
  }
}
