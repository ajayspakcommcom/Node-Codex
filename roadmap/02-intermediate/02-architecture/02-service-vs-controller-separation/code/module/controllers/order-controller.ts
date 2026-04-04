import type { OrderService } from "../services/order-service.js";

interface HttpRequest {
  readonly body: Record<string, unknown>;
}

interface HttpResponse {
  readonly statusCode: number;
  readonly body: unknown;
}

export class OrderController {
  public constructor(private readonly orderService: OrderService) {}

  public list(): HttpResponse {
    return {
      statusCode: 200,
      body: this.orderService.listOrders(),
    };
  }

  public create(request: HttpRequest): HttpResponse {
    return {
      statusCode: 201,
      body: this.orderService.createOrder({
        customerId: String(request.body.customerId ?? ""),
        itemCount: Number(request.body.itemCount ?? 0),
        totalInCents: Number(request.body.totalInCents ?? 0),
      }),
    };
  }
}
