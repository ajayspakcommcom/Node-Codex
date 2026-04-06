import { LegacyBillingAdapter } from "./contexts/billing/acl/legacy-billing-adapter.js";
import { createLogger } from "./shared/logger.js";

const logger = createLogger("ddd");
const adapter = new LegacyBillingAdapter();

const command = adapter.translateOrderCharge({
  orderId: "ord_902",
  customerId: "cus_902",
  amountInCents: 15_000,
  currency: "INR",
});

logger.info("anti_corruption_layer_translation", {
  command,
});
