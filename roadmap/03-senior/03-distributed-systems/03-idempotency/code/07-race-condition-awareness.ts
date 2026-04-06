import { createLogger } from "./shared/logger";

const logger = createLogger("race-condition");

logger.info("bad_pattern", {
  flow: "check if key exists -> perform side effect -> save idempotency record",
  risk: "Two concurrent requests can both pass the check before the record exists.",
});

logger.info("better_pattern", {
  flow: "reserve idempotency record first -> perform side effect -> complete record",
  risk: "Reduces duplicate execution windows.",
});
