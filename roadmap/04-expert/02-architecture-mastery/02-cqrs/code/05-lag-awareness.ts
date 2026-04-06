import { createLogger } from "./shared/logger.js";

const logger = createLogger("cqrs");

logger.warn("projection_lag_review", {
  projectionLagMs: 240,
  note: "Projection lag should be treated as an operational signal, not a hidden implementation detail.",
});
