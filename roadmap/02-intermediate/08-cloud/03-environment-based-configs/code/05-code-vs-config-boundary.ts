import { logger } from "./shared/logger.js";

logger.info("Code vs config boundary", {
  keepInCode: ["business rules", "request handling logic", "domain behavior"],
  keepInConfig: ["database URLs", "log levels", "feature toggles", "secrets"],
});
