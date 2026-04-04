interface PaginationOptions {
  readonly page?: number;
  readonly pageSize?: number;
  readonly maxPageSize?: number;
}

interface NormalizedPagination {
  readonly page: number;
  readonly pageSize: number;
  readonly offset: number;
  readonly warnings: readonly string[];
}

function normalizePagination(
  options: PaginationOptions = {},
  defaultPageSize = 25,
): NormalizedPagination {
  const page = options.page ?? 1;
  const maxPageSize = options.maxPageSize ?? 100;
  let pageSize = options.pageSize ?? defaultPageSize;
  const warnings: string[] = [];

  if (pageSize > maxPageSize) {
    warnings.push(`Requested pageSize ${pageSize} exceeds max ${maxPageSize}`);
    pageSize = maxPageSize;
  }

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    warnings,
  };
}

const pagination = normalizePagination({ page: 2, pageSize: 250, maxPageSize: 100 });
console.log("Normalized pagination:", pagination);
