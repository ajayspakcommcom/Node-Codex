import { createLogger } from "@platform/observability/logger";
import { postJson } from "@platform/internal-http/client";
import { type CreateOrderRequest, type OrderCreatedResponse } from "@platform/contracts/order-api";

const logger = createLogger("api-gateway");
const ordersServiceUrl = process.env.ORDERS_SERVICE_URL ?? "http://orders-service:4100";

async function createOrder(request: CreateOrderRequest): Promise<OrderCreatedResponse> {
  logger.info("gateway_order_request_received", {
    route: "/orders",
    customerId: request.customerId,
  });

  return postJson<CreateOrderRequest, OrderCreatedResponse>(
    `${ordersServiceUrl}/internal/orders`,
    request,
  );
}

void createOrder({
  customerId: "cus_100",
  items: [{ sku: "sku_1", quantity: 2 }],
  paymentMethodId: "pm_10",
}).then((response) => {
  logger.info("gateway_order_request_completed", {
    orderId: response.orderId,
    status: response.status,
  });
});
