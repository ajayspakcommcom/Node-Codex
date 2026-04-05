import type {
  ApiVersion,
  CreateOrderInput,
  OrderRecord,
  V1CreateOrderRequest,
  V1OrderDto,
  V2CreateOrderRequest,
  V2OrderDto,
} from "../../shared/order-contracts.js";

export function toCreateOrderInput(version: ApiVersion, body: unknown): CreateOrderInput {
  if (version === "v1") {
    return fromV1CreateRequest(body);
  }

  return fromV2CreateRequest(body);
}

export function toOrderResponse(version: ApiVersion, order: OrderRecord): V1OrderDto | V2OrderDto {
  if (version === "v1") {
    return {
      id: order.id,
      totalInCents: order.amountInCents,
      status: order.status,
      isRush: order.priority === "expedited",
    };
  }

  return {
    id: order.id,
    total: {
      amountInCents: order.amountInCents,
      currency: order.currency,
    },
    status: order.status,
    fulfillment: {
      priority: order.priority,
    },
    createdAt: order.createdAt,
  };
}

function fromV1CreateRequest(body: unknown): CreateOrderInput {
  const request = body as Partial<V1CreateOrderRequest>;

  return {
    customerId: String(request.customerId ?? ""),
    amountInCents: Number(request.totalInCents ?? 0),
    currency: "USD",
    priority: request.rush === true ? "expedited" : "standard",
  };
}

function fromV2CreateRequest(body: unknown): CreateOrderInput {
  const request = body as Partial<V2CreateOrderRequest>;
  const total = request.total;

  if (total === undefined) {
    throw new Error("v2 requests must provide total.amountInCents and total.currency.");
  }

  return {
    customerId: String(request.customerId ?? ""),
    amountInCents: Number(total.amountInCents ?? 0),
    currency: total.currency ?? "USD",
    priority: request.fulfillmentPriority ?? "standard",
  };
}
