import type { IdGenerator, OrderRepository, QuoteRequest, StoredOrder } from "../../shared/testing-types.js";
import { PricingService } from "./pricing-service.js";
import { QuoteRequestValidator } from "../validators/quote-request-validator.js";

export class OrderApplicationService {
  public constructor(
    private readonly orderRepository: OrderRepository,
    private readonly pricingService: PricingService,
    private readonly validator: QuoteRequestValidator,
    private readonly idGenerator: IdGenerator,
  ) {}

  public async createQuotedOrder(ownerUserId: string, request: QuoteRequest): Promise<StoredOrder> {
    const validationErrors = this.validator.validate(request);

    if (validationErrors.length > 0) {
      throw new Error(`Invalid quote request: ${validationErrors.join(", ")}`);
    }

    const order: StoredOrder = {
      orderId: this.idGenerator.nextId(),
      tenantId: request.tenantId,
      ownerUserId,
      status: "draft",
      quote: this.pricingService.calculateQuote(request),
    };

    await this.orderRepository.save(order);

    return order;
  }
}
