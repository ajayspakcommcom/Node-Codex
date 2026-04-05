import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Choose the abstraction that fits the workload instead of applying one style by ideology.",
  "Inspect generated queries for important paths even when using a high-level ORM.",
  "Keep repository methods business-focused so services do not depend on tool-specific primitives.",
  "Use query builders deliberately for reporting, export, and performance-sensitive reads.",
  "Consider migration and schema-evolution workflow in the abstraction decision.",
  "Allow mixed approaches only when the boundaries remain explicit and consistent.",
];

logger.info("Maintainability patterns for ORMs vs query builders", {
  maintainabilityPatterns,
  guidance: "Enterprise maintainability depends more on clear boundaries and workload fit than on picking a fashionable persistence tool.",
});
