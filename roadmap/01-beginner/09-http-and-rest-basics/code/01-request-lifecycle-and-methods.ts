import type { HttpRequest, HttpResponse } from "./shared/http-types.js";
import { created, ok } from "./shared/response-helpers.js";

interface Order {
  readonly id: string;
  readonly status: "created" | "cancelled";
}

function handleRequest(request: HttpRequest<{ orderId?: string }>): HttpResponse {
  switch (request.method) {
    case "GET":
      return ok(
        {
          requestLifecycle: [
            "transport-boundary",
            "validation",
            "business-logic",
            "response-formatting",
          ],
          note: "GET is safe and should not change server state",
        },
      );
    case "POST":
      return created<Order>({
        id: request.body?.orderId ?? "ord_new",
        status: "created",
      });
    case "PUT":
      return ok({
        id: request.params.id ?? "ord_unknown",
        note: "PUT is commonly used for full replacement and is expected to be idempotent",
      });
    case "PATCH":
      return ok({
        id: request.params.id ?? "ord_unknown",
        note: "PATCH updates part of a resource and may not be idempotent unless designed carefully",
      });
    case "DELETE":
      return ok({
        id: request.params.id ?? "ord_unknown",
        status: "cancelled",
      });
  }
}

console.log(handleRequest({ method: "GET", path: "/orders", params: {}, query: {}, headers: {}, cookies: {} }));
console.log(
  handleRequest({
    method: "POST",
    path: "/orders",
    params: {},
    query: {},
    headers: {},
    cookies: {},
    body: { orderId: "ord_1001" },
  }),
);
