import { logger } from "./shared/logger.js";

const maintainabilityPatterns = [
  "Define permissions clearly before grouping them into roles.",
  "Keep authorization decisions close to the business action, not only at the route layer.",
  "Account for tenant and ownership boundaries explicitly.",
  "Use least privilege as a design rule instead of granting broad convenience access.",
  "Review the role catalog when exception-driven roles start multiplying.",
  "Document what each role can actually do and why it exists.",
];

logger.info("Maintainability patterns for RBAC", {
  maintainabilityPatterns,
  guidance: "Enterprise RBAC stays maintainable when permissions, boundaries, and contextual checks remain explicit and understandable.",
});
