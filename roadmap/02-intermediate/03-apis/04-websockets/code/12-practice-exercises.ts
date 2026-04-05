import { logger } from "./shared/logger.js";

const practiceExercises = [
  "Add heartbeat timeout tracking so inactive connections are disconnected automatically.",
  "Model a reconnect token flow that restores user subscriptions safely after reconnect.",
  "Add tenant-specific rate limits for broadcast-heavy rooms.",
  "Introduce sequence-gap detection for clients that reconnect after missing events.",
  "Add tests proving cross-instance room broadcasts reach subscribers connected to different gateway instances.",
];

logger.info("WebSockets practice exercises", {
  practiceExercises,
});
