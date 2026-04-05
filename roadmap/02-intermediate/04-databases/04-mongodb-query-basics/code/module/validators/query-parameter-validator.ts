import type { QueryParameters } from "../../shared/mongo-types.js";

export class QueryParameterValidator {
  public validate(parameters: QueryParameters): {
    readonly safeParameters: QueryParameters;
    readonly warnings: readonly string[];
  } {
    const warnings: string[] = [];
    const safePage = Math.max(1, parameters.page ?? 1);
    const safePageSize = Math.min(50, Math.max(1, parameters.pageSize ?? 20));

    if ((parameters.pageSize ?? 20) > 50) {
      warnings.push("Requested page size exceeded the safe limit and was reduced.");
    }

    if ((parameters.page ?? 1) < 1) {
      warnings.push("Requested page was below 1 and was normalized.");
    }

    if (parameters.sortBy !== undefined && !["createdAt", "totalInCents"].includes(parameters.sortBy)) {
      warnings.push("Unsupported sort field requested and ignored.");
    }

    return {
      safeParameters: {
        ...parameters,
        page: safePage,
        pageSize: safePageSize,
        sortBy: parameters.sortBy === "totalInCents" ? "totalInCents" : "createdAt",
        sortDirection: parameters.sortDirection === "asc" ? "asc" : "desc",
      },
      warnings,
    };
  }
}
