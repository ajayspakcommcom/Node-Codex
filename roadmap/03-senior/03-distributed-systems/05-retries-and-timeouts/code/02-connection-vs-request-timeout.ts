import { createLogger } from "./shared/logger";

const logger = createLogger("timeout-types");

logger.info("connection_timeout", {
  purpose: "Bound time spent establishing the network connection.",
});

logger.info("request_timeout", {
  purpose: "Bound total time spent waiting for dependency response data.",
});
