import { failure, ok } from "./shared/response-helpers.js";
import { parsePositiveInteger } from "./shared/validation.js";

interface ListQuery {
  readonly page?: string;
  readonly pageSize?: string;
  readonly sort?: string;
  readonly status?: string;
}

function listOrders(query: ListQuery) {
  try {
    const page = parsePositiveInteger(query.page ?? "1", "page");
    const pageSize = parsePositiveInteger(query.pageSize ?? "20", "pageSize");
    const sort = query.sort ?? "createdAt:desc";
    const status = query.status ?? "all";

    return ok(
      [
        { id: "ord_1", status: "paid" },
        { id: "ord_2", status: "created" },
      ],
      {
        page,
        pageSize,
        sort,
        status,
      },
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return failure(400, "INVALID_QUERY", error.message);
    }

    return failure(500, "INTERNAL_SERVER_ERROR", "unexpected error");
  }
}

console.log(listOrders({ page: "1", pageSize: "25", sort: "createdAt:desc", status: "paid" }));
