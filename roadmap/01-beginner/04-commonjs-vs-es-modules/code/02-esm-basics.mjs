import { createLogger } from "./shared/esm/logger.mjs";

const logger = createLogger("modern-billing-service");

logger.info("Loaded ES Module", {
  importStyle: "import",
  exportStyle: "named export",
});
