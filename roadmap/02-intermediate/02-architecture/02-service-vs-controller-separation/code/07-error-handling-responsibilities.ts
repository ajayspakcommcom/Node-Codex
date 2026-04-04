import { logger } from "./shared/logger.js";
import { OrderController } from "./module/controllers/order-controller.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OrderService } from "./module/services/order-service.js";

const controller = new OrderController(new OrderService(new OrderRepository()));

try {
  controller.create({
    body: {
      customerId: "customer_5",
      itemCount: 2,
      totalInCents: 0,
    },
  });
} catch (error) {
  logger.error("Error-handling responsibility example", {
    error,
    guidance:
      "The service raises domain or validation failures, and the controller boundary is responsible for mapping them into HTTP responses.",
  });
}
