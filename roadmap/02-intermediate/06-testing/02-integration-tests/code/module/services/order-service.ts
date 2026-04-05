import type { CreateOrderRequestBody, OrderRecord, UserIdentity } from "../../shared/integration-types.js";
import { OrderRepository } from "../repositories/order-repository.js";
import { OrderEventService } from "./order-event-service.js";

export class OrderService {
  public constructor(
    private readonly orderRepository: OrderRepository,
    private readonly orderEventService: OrderEventService,
  ) {}

  public async createOrder(identity: UserIdentity, body: CreateOrderRequestBody): Promise<OrderRecord> {
    this.assertCanCreate(identity);
    this.assertValidBody(body);

    const nextOrderNumber = (await this.orderRepository.listByTenant(identity.tenantId)).length + 101;

    const order: OrderRecord = {
      orderId: `ord_${nextOrderNumber}`,
      tenantId: identity.tenantId,
      ownerUserId: identity.userId,
      sku: body.sku,
      quantity: body.quantity,
      unitPriceCents: body.unitPriceCents,
      totalCents: body.quantity * body.unitPriceCents,
      status: "submitted",
    };

    await this.orderRepository.save(order);
    await this.orderEventService.recordOrderCreated(order.orderId, order.tenantId);

    return order;
  }

  public async listOrders(identity: UserIdentity): Promise<readonly OrderRecord[]> {
    return this.orderRepository.listByTenant(identity.tenantId);
  }

  private assertCanCreate(identity: UserIdentity): void {
    if (!identity.roles.some((role) => role === "manager" || role === "admin")) {
      throw new Error("User is not allowed to create orders");
    }
  }

  private assertValidBody(body: CreateOrderRequestBody): void {
    if (!body.sku || body.quantity <= 0 || body.unitPriceCents <= 0) {
      throw new Error("Invalid order payload");
    }
  }
}
