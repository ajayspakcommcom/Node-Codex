export interface PaginationMeta {
  readonly page: number;
  readonly pageSize: number;
  readonly totalCount: number;
}

export function successResponse<TData>(data: TData, meta?: PaginationMeta) {
  return {
    success: true,
    data,
    meta,
  };
}
