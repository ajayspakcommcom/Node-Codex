import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Keep authentication and authorization explicit at connection and room boundaries.",
  "Use named events with structured payloads instead of arbitrary ad hoc messages.",
  "Treat connect, subscribe, deliver, acknowledge, and disconnect flows as first-class behaviors.",
  "Plan for shared pub-sub or broker coordination before scaling real-time fan-out broadly.",
  "Measure active connections, blocked deliveries, reconnects, and room sizes so behavior stays observable.",
];

logger.info("Maintainability patterns for WebSockets", {
  maintainabilityPatterns,
  guidance: "Enterprise real-time systems stay maintainable when connection lifecycle, authorization, and fan-out behavior remain explicit rather than magical.",
});
