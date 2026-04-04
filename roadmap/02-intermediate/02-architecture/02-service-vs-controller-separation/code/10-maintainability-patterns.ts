import { logger } from "./shared/logger.js";
import { OrderController } from "./module/controllers/order-controller.js";
import { OrderRepository } from "./module/repositories/order-repository.js";
import { OrderService } from "./module/services/order-service.js";

class OrderModule {
  public readonly repository = new OrderRepository();
  public readonly service = new OrderService(this.repository);
  public readonly controller = new OrderController(this.service);
}

const module = new OrderModule();
const response = module.controller.list();

logger.info("Maintainability pattern example", {
  response,
  rule: "Keep controller/service wiring explicit so business logic remains reusable and transport behavior remains easy to trace.",
});
