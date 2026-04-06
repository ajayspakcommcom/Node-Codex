import { createLogger } from "./shared/logger";

const logger = createLogger("natural-vs-enforced");

function replaceCustomerPreference(
  currentValue: string,
  requestedValue: string,
): string {
  return requestedValue;
}

logger.info("natural_idempotency", {
  operation: "replace preference value",
  finalState: replaceCustomerPreference("weekly", "daily"),
  note: "Applying the same replacement repeatedly leads to the same state.",
});

logger.info("enforced_idempotency", {
  operation: "create payment",
  note: "Creation requires an idempotency key or deduplication boundary.",
});
