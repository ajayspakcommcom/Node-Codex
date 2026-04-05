import { logger } from "./shared/logger.js";

logger.warn("Contract drift risk with mocks", {
  risks: [
    "a mocked payment response omits fields the real gateway always sends",
    "the notifier stub accepts shapes the real provider would reject",
    "a mock never simulates transient or partial failures seen in production",
  ],
  mitigation: [
    "keep doubles close to the actual interface contract",
    "add higher-level integration tests for important dependency boundaries",
    "review mocks when the external contract changes",
  ],
});
