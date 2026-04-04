import { logger } from "./shared/logger.js";
import { OrderService } from "./module/services/order-service.js";
import { OrderRepository } from "./module/repositories/order-repository.js";

const service = new OrderService(new OrderRepository());
const dto = service.listOrders()[0];

logger.info("DTO and input boundary example", {
  dto,
  guidance: "Services should return explicit contracts instead of leaking persistence-only fields into API responses.",
});
