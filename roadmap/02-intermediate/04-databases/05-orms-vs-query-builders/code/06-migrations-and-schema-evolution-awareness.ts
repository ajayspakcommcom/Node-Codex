import { logger } from "./shared/logger.js";

const ormImpact = {
  strength: "Centralized models can make schema changes easier to discover across CRUD code.",
  risk: "Tight coupling to entity shape can create larger refactor surfaces during migration.",
};

const builderImpact = {
  strength: "Query-by-query control can help phased rollout of new columns or joins.",
  risk: "Schema changes may require touching many explicit query fragments if boundaries are weak.",
};

logger.info("Migrations and schema evolution awareness", {
  ormImpact,
  builderImpact,
  guidance: "Enterprise teams should include migration workflow in the abstraction decision instead of treating it as a separate problem.",
});
