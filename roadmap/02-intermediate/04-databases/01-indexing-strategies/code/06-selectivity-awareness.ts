import { QueryAnalyzer } from "./module/analyzers/query-analyzer.js";
import { IndexRegistry } from "./module/registry/index-registry.js";
import { exampleIndexes } from "./shared/indexing-runtime.js";
import { logger } from "./shared/logger.js";

const queryAnalyzer = new QueryAnalyzer(new IndexRegistry(exampleIndexes));

const selectivityProfiles = [
  {
    column: "country_code",
    distinctValueRatio: 0.02,
    note: "Many rows share the same value.",
  },
  {
    column: "user_id",
    distinctValueRatio: 0.72,
    note: "This column narrows candidate sets more effectively.",
  },
];

logger.info("Selectivity awareness", {
  assessments: selectivityProfiles.map((profile) => ({
    profile,
    assessment: queryAnalyzer.assessSelectivity(profile),
  })),
  guidance: "Low-selectivity columns often need more context before they become worthwhile indexes. Selectivity affects whether an index meaningfully narrows the search space.",
});
