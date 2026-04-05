import { QueryShapeAdvisor } from "./module/advisors/query-shape-advisor.js";
import { logger } from "./shared/logger.js";

const advisor = new QueryShapeAdvisor();
const advice = advisor.advise({
  status: "placed",
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 1,
  pageSize: 20,
});
const revenueSortAdvice = advisor.advise({
  sortBy: "totalInCents",
  sortDirection: "desc",
  page: 1,
  pageSize: 20,
});

logger.info("Query shape and index alignment", {
  defaultGridAdvice: advice,
  revenueSortAdvice,
  guidance: "MongoDB query review should consider filtering and sorting together so the likely index shape matches the actual request pattern.",
});
