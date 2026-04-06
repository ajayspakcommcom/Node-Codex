import test from "node:test";
import assert from "node:assert/strict";
import { TokenBucketLimiter } from "../shared/token-bucket.mjs";

test("token bucket rejects once capacity is exhausted without enough refill time", () => {
  const limiter = new TokenBucketLimiter(2, 1);
  const now = 1_000;

  assert.equal(limiter.tryConsume("tenant", 1, now), true);
  assert.equal(limiter.tryConsume("tenant", 1, now), true);
  assert.equal(limiter.tryConsume("tenant", 1, now), false);
});

test("token bucket refills over time", () => {
  const limiter = new TokenBucketLimiter(2, 2);

  limiter.tryConsume("tenant", 1, 1_000);
  limiter.tryConsume("tenant", 1, 1_000);

  assert.equal(limiter.tryConsume("tenant", 1, 2_000), true);
});
