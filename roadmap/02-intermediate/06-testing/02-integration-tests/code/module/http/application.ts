import type { DomainEventPublisher, HttpRequest, HttpResponse } from "../../shared/integration-types.js";
import { InMemoryDatabase } from "../db/in-memory-database.js";
import { OrderRepository } from "../repositories/order-repository.js";
import { AuthenticationService } from "../services/authentication-service.js";
import { OrderEventService } from "../services/order-event-service.js";
import { OrderService } from "../services/order-service.js";

export class Application {
  private readonly authenticationService = new AuthenticationService();

  public constructor(
    private readonly database: InMemoryDatabase,
    private readonly publisher: DomainEventPublisher,
  ) {}

  public async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.database.runInTransaction(async (transaction) => {
        const identity = this.authenticationService.authenticate(request.headers.authorization);
        const orderRepository = new OrderRepository(transaction);
        const orderEventService = new OrderEventService(transaction, this.publisher);
        const orderService = new OrderService(orderRepository, orderEventService);

        if (request.method === "POST" && request.path === "/orders") {
          const order = await orderService.createOrder(identity, request.body as never);
          await orderEventService.flushOutbox();

          return {
            statusCode: 201,
            body: {
              orderId: order.orderId,
              status: order.status,
              totalCents: order.totalCents,
            },
          };
        }

        if (request.method === "GET" && request.path === "/orders") {
          const orders = await orderService.listOrders(identity);

          return {
            statusCode: 200,
            body: orders.map((order) => ({
              orderId: order.orderId,
              sku: order.sku,
              status: order.status,
              totalCents: order.totalCents,
            })),
          };
        }

        return {
          statusCode: 404,
          body: { message: "Route not found" },
        };
      });
    } catch (error) {
      if (error instanceof Error && error.message === "Missing bearer token") {
        return {
          statusCode: 401,
          body: { message: error.message },
        };
      }

      if (
        error instanceof Error &&
        (error.message === "Invalid token payload" ||
          error.message === "User is not allowed to create orders" ||
          error.message === "Invalid order payload")
      ) {
        return {
          statusCode: 403,
          body: { message: error.message },
        };
      }

      return {
        statusCode: 500,
        body: { message: error instanceof Error ? error.message : "Unexpected error" },
      };
    }
  }
}
