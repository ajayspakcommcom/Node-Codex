import { logger } from "./shared/logger.js";
import { OrderController } from "./module/controllers/order-controller.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OrderService } from "./module/services/order-service.js";

const controller = new OrderController(new OrderService(new OrderRepository()));

const response = controller.create({
  body: {
    customerId: "customer_3",
    itemCount: 1,
    totalInCents: 2500,
  },
});

logger.info("Thin controller example", {
  response,
  guidance: "Thin controllers translate transport input into service calls and avoid embedding business rules directly.",
});
