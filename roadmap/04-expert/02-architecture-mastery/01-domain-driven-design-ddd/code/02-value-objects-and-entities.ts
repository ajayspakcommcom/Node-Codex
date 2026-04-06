import { Money } from "./contexts/orders/domain/money.js";
import { Quantity } from "./contexts/orders/domain/quantity.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");

const unitPrice = Money.fromCents(12_500, "INR");
const quantity = Quantity.of(2);

logger.info("value_objects_example", {
  unitPrice: unitPrice.toJSON(),
  quantity: quantity.value,
});
