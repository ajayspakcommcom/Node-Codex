import { type CreateOrderRequest, type OrderCreatedResponse } from "@platform/contracts/order-api";
import { createLogger } from "@platform/observability/logger";
import { type OrderCreatedEvent, createOrderCreatedEvent } from "@platform/contracts/order-events";
import { postJson } from "@platform/internal-http/client";

const logger = createLogger("orders-service");

interface DependencyConfig {
  readonly inventoryServiceUrl: string;
  readonly paymentsServiceUrl: string;
}

export async function createOrder(
  request: CreateOrderRequest,
  dependencies: DependencyConfig,
): Promise<{
  readonly response: OrderCreatedResponse;
  readonly event: OrderCreatedEvent;
}> {
  logger.info("order_workflow_started", {
    customerId: request.customerId,
    itemCount: request.items.length,
  });

  await postJson(`${dependencies.inventoryServiceUrl}/internal/reservations`, {
    customerId: request.customerId,
    items: request.items,
  });

  await postJson(`${dependencies.paymentsServiceUrl}/internal/charges`, {
    customerId: request.customerId,
    paymentMethodId: request.paymentMethodId,
  });

  const response: OrderCreatedResponse = {
    orderId: `ord_${request.customerId}`,
    status: "confirmed",
  };

  return {
    response,
    event: createOrderCreatedEvent(response.orderId, request.customerId),
  };
}
