import { logger } from "./shared/logger.js";
import { OrderService } from "./module/services/order-service.js";
import { OrderRepository } from "./module/repositories/order-repository.js";

const service = new OrderService(new OrderRepository());

try {
  service.createOrder({
    customerId: "customer_4",
    itemCount: 0,
    totalInCents: 4000,
  });
} catch (error) {
  logger.warn("Service-owned business rule example", {
    error,
    guidance: "Business invariants should live in the service layer where they are reusable and testable.",
  });
}
