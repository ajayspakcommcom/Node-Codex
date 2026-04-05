import { OrderOrmRepository } from "./module/orm/order-orm-repository.js";
import { exampleOrders } from "./shared/data-access-runtime.js";
import { logger } from "./shared/logger.js";

const repository = new OrderOrmRepository(exampleOrders);
const entity = repository.findById("ord_3001");
const updated = repository.save(entity.markRefunded());

logger.info("ORM-style CRUD workflow", {
  beforeRefundAllowed: entity.canBeRefunded(),
  updatedEntity: updated.toJSON(),
  isHighValue: updated.isHighValue(),
  guidance: "ORM-style access is often productive for model-centric workflows where entities and lifecycle semantics help the team move quickly.",
});
