import { logger } from "./shared/logger.js";

logger.warn("Common mocking mistakes", {
  mistakes: [
    "mocking core logic instead of infrastructure boundaries",
    "using brittle call-order assertions for non-critical details",
    "sharing one huge mock setup across unrelated scenarios",
    "treating mocks as if they prove integration correctness",
    "letting test doubles diverge from real dependency contracts",
  ],
});
