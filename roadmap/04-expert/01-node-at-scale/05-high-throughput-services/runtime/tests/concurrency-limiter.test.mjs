import test from "node:test";
import assert from "node:assert/strict";
import { ConcurrencyLimiter } from "../shared/concurrency-limiter.mjs";

test("concurrency limiter rejects work above the configured limit", async () => {
  const limiter = new ConcurrencyLimiter(1);

  const first = limiter.run(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10));
    return "first";
  });

  await assert.rejects(
    limiter.run(async () => "second"),
    /concurrency limit reached/,
  );

  await first;
});
