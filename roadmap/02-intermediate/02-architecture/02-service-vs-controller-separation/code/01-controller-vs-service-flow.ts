import { logger } from "./shared/logger.js";
import { OrderController } from "./module/controllers/order-controller.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OrderService } from "./module/services/order-service.js";

const controller = new OrderController(new OrderService(new OrderRepository()));

const listResponse = controller.list();
const createResponse = controller.create({
  body: {
    customerId: "customer_2",
    itemCount: 3,
    totalInCents: 7500,
  },
});

logger.info("Controller vs service request flow", {
  listResponse,
  createResponse,
  guidance: "The controller receives request data and delegates business rules to the service layer.",
});
