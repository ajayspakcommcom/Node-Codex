import { logger } from "./shared/logger.js";

logger.info("Practice exercises for mocking", {
  exercises: [
    "Add a retrying payment gateway wrapper and test transient failure handling with a mock.",
    "Create a fake inventory repository and decide whether it should stay a fake or become an integration test.",
    "Extend CheckoutService with invoice delivery and verify only meaningful audit interactions with a spy.",
    "Model a changed payment-gateway contract and show how a stale mock can hide the breakage.",
    "Refactor an overly mocked test to assert business outcomes instead of internal choreography.",
  ],
});
