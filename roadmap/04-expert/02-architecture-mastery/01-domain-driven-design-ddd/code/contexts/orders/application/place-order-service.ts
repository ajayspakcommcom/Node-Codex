import { type LegacyChargeGateway } from "../../billing/acl/legacy-billing-adapter.js";
import { Order, type PlaceOrderInput } from "../domain/order.js";
import { type OrderRepository } from "../domain/order-repository.js";

export class PlaceOrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly chargeGateway: LegacyChargeGateway,
  ) {}

  async execute(input: PlaceOrderInput): Promise<Order> {
    const order = Order.place(input);

    await this.chargeGateway.charge({
      orderId: order.orderId,
      customerId: order.customerId,
      amountInCents: order.total().amountInCents,
      currency: order.total().currency,
    });

    const confirmedOrder = order.confirm();
    await this.orderRepository.save(confirmedOrder);

    return confirmedOrder;
  }
}
