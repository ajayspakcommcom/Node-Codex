import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

logger.info("context_map_relationships", {
  relationships: [
    {
      upstream: "billing",
      downstream: "orders",
      pattern: "anti-corruption-layer",
    },
    {
      upstream: "orders",
      downstream: "reporting",
      pattern: "published-language",
    },
  ],
});
