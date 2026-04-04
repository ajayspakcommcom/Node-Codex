const { createLogger } = require("./shared/commonjs/logger.cjs");

const logger = createLogger("legacy-billing-service");

logger.info("Loaded CommonJS module", {
  importStyle: "require",
  exportStyle: "module.exports",
});
