import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add category filtered catalog caching with safe key design.",
    "Add cache warming for a list of hot products.",
    "Add a stale while revalidate style read path for catalog endpoints.",
    "Add product deletion and prove the cache invalidation behavior.",
    "Add metrics that calculate a product and catalog hit rate summary.",
  ],
});
