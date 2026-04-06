export class TokenBucketRateLimiter {
  private readonly state = new Map<string, { tokens: number; lastRefillAt: number }>();

  constructor(
    private readonly capacity: number,
    private readonly refillPerSecond: number,
  ) {}

  allow(key: string): boolean {
    const now = Date.now();
    const currentState = this.state.get(key) ?? {
      tokens: this.capacity,
      lastRefillAt: now,
    };

    const elapsedSeconds = Math.max(0, (now - currentState.lastRefillAt) / 1_000);
    const refilledTokens = Math.min(
      this.capacity,
      currentState.tokens + elapsedSeconds * this.refillPerSecond,
    );

    if (refilledTokens < 1) {
      this.state.set(key, {
        tokens: refilledTokens,
        lastRefillAt: now,
      });
      return false;
    }

    this.state.set(key, {
      tokens: refilledTokens - 1,
      lastRefillAt: now,
    });
    return true;
  }
}

export class ConcurrencyGuard {
  private active = 0;

  constructor(private readonly maxConcurrent: number) {}

  async run<T>(task: () => Promise<T>): Promise<T> {
    if (this.active >= this.maxConcurrent) {
      throw new Error("503 concurrency limit reached");
    }

    this.active += 1;
    try {
      return await task();
    } finally {
      this.active -= 1;
    }
  }
}
