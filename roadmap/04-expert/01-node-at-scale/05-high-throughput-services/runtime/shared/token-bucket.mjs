export class TokenBucketLimiter {
  #buckets = new Map();

  constructor(capacity, refillPerSecond) {
    this.capacity = capacity;
    this.refillPerSecond = refillPerSecond;
  }

  tryConsume(key, amount, now = Date.now()) {
    const state = this.#buckets.get(key) ?? {
      tokens: this.capacity,
      lastRefillAt: now,
    };

    const elapsedSeconds = Math.max(0, (now - state.lastRefillAt) / 1_000);
    const availableTokens = Math.min(
      this.capacity,
      state.tokens + elapsedSeconds * this.refillPerSecond,
    );

    if (availableTokens < amount) {
      this.#buckets.set(key, {
        tokens: availableTokens,
        lastRefillAt: now,
      });
      return false;
    }

    this.#buckets.set(key, {
      tokens: availableTokens - amount,
      lastRefillAt: now,
    });
    return true;
  }
}
