import test from "node:test";
import assert from "node:assert/strict";
import { BoundedCache } from "../shared/bounded-cache.mjs";

test("bounded cache never exceeds configured size", () => {
  const cache = new BoundedCache(3);

  cache.set("a", 1);
  cache.set("b", 2);
  cache.set("c", 3);
  cache.set("d", 4);

  assert.equal(cache.size(), 3);
});
