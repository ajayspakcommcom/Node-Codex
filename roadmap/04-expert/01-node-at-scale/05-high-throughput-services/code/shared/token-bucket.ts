interface BucketState {
  tokens: number;
  lastRefillAt: number;
}

export class TokenBucketLimiter {
  private readonly buckets = new Map<string, BucketState>();

  constructor(
    private readonly capacity: number,
    private readonly refillPerSecond: number,
  ) {}

  tryConsume(key: string, amount: number): boolean {
    const now = Date.now();
    const state = this.buckets.get(key) ?? {
      tokens: this.capacity,
      lastRefillAt: now,
    };

    const elapsedSeconds = Math.max(0, (now - state.lastRefillAt) / 1_000);
    const availableTokens = Math.min(
      this.capacity,
      state.tokens + elapsedSeconds * this.refillPerSecond,
    );

    if (availableTokens < amount) {
      this.buckets.set(key, {
        tokens: availableTokens,
        lastRefillAt: now,
      });
      return false;
    }

    this.buckets.set(key, {
      tokens: availableTokens - amount,
      lastRefillAt: now,
    });
    return true;
  }
}
