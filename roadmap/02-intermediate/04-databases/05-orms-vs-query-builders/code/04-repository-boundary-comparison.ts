import { logger } from "./shared/logger.js";

const goodBoundary = {
  method: "listHighValueOrdersForDashboard(tenantId)",
  benefit: "The service code depends on a business-facing repository method rather than ORM entities or builder fragments.",
};

const badBoundary = {
  method: "service.buildOwnQueryBuilderChain()",
  risk: "The persistence abstraction leaks into services, making refactoring, testing, and tool changes harder.",
};

logger.info("Repository boundary comparison", {
  goodBoundary,
  badBoundary,
  guidance: "The enterprise decision is not only ORM versus builder. It is also whether the repository boundary stays stable and business-focused.",
});
