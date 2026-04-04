import type { HttpRequest } from "./shared/http-types.js";
import { failure, ok } from "./shared/response-helpers.js";
import { parsePositiveInteger, requireAuthorizationHeader, requireNonEmptyString } from "./shared/validation.js";

interface UpdateOrderBody {
  readonly status?: string;
}

function validateAndHandleOrderUpdate(request: HttpRequest<UpdateOrderBody>) {
  try {
    const orderId = requireNonEmptyString(request.params.orderId, "orderId");
    const actorHeader = requireAuthorizationHeader(request.headers.authorization);
    const page = parsePositiveInteger(request.query.page, "page");
    const status = requireNonEmptyString(request.body?.status, "status");

    return ok({
      orderId,
      actorHeader,
      page,
      status,
      note: "Validation happened at the HTTP boundary before business logic",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return failure(400, "VALIDATION_ERROR", error.message);
    }

    return failure(500, "INTERNAL_SERVER_ERROR", "unexpected error");
  }
}

console.log(
  validateAndHandleOrderUpdate({
    method: "PATCH",
    path: "/orders/ord_500",
    params: { orderId: "ord_500" },
    query: { page: "1" },
    headers: { authorization: "Bearer token-123" },
    cookies: {},
    body: { status: "paid" },
  }),
);
