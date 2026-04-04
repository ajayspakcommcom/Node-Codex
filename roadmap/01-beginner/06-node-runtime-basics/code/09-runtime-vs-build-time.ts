import { createLogger } from "./shared/logger.js";

const logger = createLogger("runtime-vs-build-time");

const buildTimeConstant = "compiled-into-code";
const runtimePort = process.env.PORT ?? "3000";

logger.info("Runtime vs build-time comparison", {
  buildTimeConstant,
  runtimePort,
  explanation: "Build-time values are part of the artifact; runtime values come from the environment",
});
