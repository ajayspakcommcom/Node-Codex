import type { QueryParameters } from "../../shared/mongo-types.js";

export class QueryShapeAdvisor {
  public advise(parameters: QueryParameters): {
    readonly likelyIndexShape: readonly string[];
    readonly warnings: readonly string[];
    readonly recommendation: string;
  } {
    const likelyIndexShape = [
      "tenantId",
      ...(parameters.status === undefined ? [] : ["status"]),
      ...(parameters.sortBy === undefined ? ["createdAt"] : [parameters.sortBy]),
    ];
    const warnings: string[] = [];

    if ((parameters.page ?? 1) > 50) {
      warnings.push("Deep page numbers can make skip-based pagination expensive.");
    }

    if (parameters.sortBy === "totalInCents" && parameters.status === undefined) {
      warnings.push("Sorting by revenue without a narrow filter may require broader index support or more work.");
    }

    return {
      likelyIndexShape,
      warnings,
      recommendation:
        "Review filtering and sorting together so the index shape supports the actual query pattern instead of only part of it.",
    };
  }
}
