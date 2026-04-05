import type {
  ExecutionPlanSummary,
  QueryPattern,
  SelectivityProfile,
} from "../../shared/indexing-types.js";
import { IndexRegistry } from "../registry/index-registry.js";

export class QueryAnalyzer {
  public constructor(private readonly indexRegistry: IndexRegistry) {}

  public explain(query: QueryPattern): ExecutionPlanSummary {
    const exactCompositeMatch = this.indexRegistry.findSupportingIndex(query.tableName, [
      ...query.filterColumns,
      ...query.sortColumns,
    ]);

    if (exactCompositeMatch !== undefined) {
      return {
        queryName: query.name,
        planType: "index-seek",
        supportingIndex: exactCompositeMatch.name,
        reason: "The index matches the query's leading filter and sort shape.",
      };
    }

    const filterOnlyMatch = this.indexRegistry.findSupportingIndex(query.tableName, query.filterColumns);

    if (filterOnlyMatch !== undefined) {
      return {
        queryName: query.name,
        planType: "index-scan",
        supportingIndex: filterOnlyMatch.name,
        reason: "The filter can use the index, but sorting or additional shape still costs extra work.",
      };
    }

    return {
      queryName: query.name,
      planType: "table-scan",
      reason: "No supporting leading index aligns with the query shape.",
    };
  }

  public describeCoveringPotential(query: QueryPattern, includes: readonly string[] | undefined): string {
    if (includes === undefined || includes.length === 0) {
      return "This index is not explicitly covering projected columns.";
    }

    const uncoveredColumns = query.projectedColumns.filter(
      (column) => !query.filterColumns.includes(column) && !query.sortColumns.includes(column) && !includes.includes(column),
    );

    if (uncoveredColumns.length === 0) {
      return "The projected columns can be served from indexed data without extra row lookups.";
    }

    return `The query still needs row lookups for: ${uncoveredColumns.join(", ")}.`;
  }

  public assessSelectivity(profile: SelectivityProfile): string {
    if (profile.distinctValueRatio >= 0.5) {
      return `${profile.column} is highly selective and often a strong index candidate.`;
    }

    if (profile.distinctValueRatio >= 0.1) {
      return `${profile.column} has moderate selectivity and should be judged by real workload patterns.`;
    }

    return `${profile.column} is low-selectivity and may provide weak benefit unless combined with other columns.`;
  }
}
