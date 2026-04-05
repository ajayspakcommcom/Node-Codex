import { logger } from "./shared/logger.js";

const comparison = {
  singleColumnIndex: {
    example: "idx_orders_status(status)",
    strength: "Simple filter support for one dominant predicate.",
    weakness: "Does not automatically optimize multi-column filtering and sorting.",
  },
  compositeIndex: {
    example: "idx_orders_user_created_at(user_id, created_at)",
    strength: "Supports predictable multi-column query shapes better.",
    weakness: "Only helps efficiently when the leading column order matches the query pattern.",
  },
};

logger.info("Single vs composite indexes", {
  comparison,
  guidance: "Single-column indexes are simpler, but composite indexes often better reflect real enterprise query shapes involving both filtering and sorting.",
});
