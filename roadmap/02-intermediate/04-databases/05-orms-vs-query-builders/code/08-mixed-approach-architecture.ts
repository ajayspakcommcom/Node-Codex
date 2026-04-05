import { AbstractionFitAdvisor } from "./module/advisors/abstraction-fit-advisor.js";
import { logger } from "./shared/logger.js";

const recommendation = new AbstractionFitAdvisor().recommend({
  workload: "mixed",
  teamStrength: "balanced",
  performanceSensitivity: "medium",
});

const mixedArchitecture = {
  transactionalCrud: "ORM-style repositories for core order and customer lifecycle flows.",
  reportingReads: "Query-builder repositories for dashboard and export workloads.",
  boundaryRule: "Services depend on business-facing repositories, not raw ORM or builder primitives.",
};

logger.info("Mixed-approach architecture", {
  recommendation,
  mixedArchitecture,
  guidance: "Many enterprise systems benefit from a bounded mixed approach instead of forcing one abstraction style across all workloads.",
});
