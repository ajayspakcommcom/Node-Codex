import { QueryShapeAdvisor } from "./module/advisors/query-shape-advisor.js";
import { logger } from "./shared/logger.js";

const advisor = new QueryShapeAdvisor();
const deepPageAdvice = advisor.advise({
  status: "placed",
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 120,
  pageSize: 20,
});

logger.warn("Skip pagination risk", {
  deepPageAdvice,
  guidance: "Large skip values can become expensive on growing collections. Enterprise teams should recognize when cursor-style pagination is a better fit.",
});
