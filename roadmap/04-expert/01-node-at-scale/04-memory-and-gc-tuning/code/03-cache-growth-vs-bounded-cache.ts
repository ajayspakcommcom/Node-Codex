import { createLogger } from "./shared/logger.js";
import { BoundedCache } from "./shared/bounded-cache.js";

const logger = createLogger("memory-gc-tuning");

const cache = new BoundedCache<string, string>(3);

cache.set("a", "alpha");
cache.set("b", "bravo");
cache.set("c", "charlie");
cache.set("d", "delta");

logger.info("bounded_cache_example", {
  size: cache.size(),
  keys: cache.keys(),
  note: "Bounded caches make memory behavior easier to reason about over long runtimes.",
});
