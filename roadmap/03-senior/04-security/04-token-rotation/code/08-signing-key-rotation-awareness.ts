import { createLogger } from "./shared/logger";

const logger = createLogger("key-rotation");

logger.info("key_rotation_distinction", {
  tokenRotation: "replace issued tokens over time",
  keyRotation: "replace signing keys used to issue or verify tokens",
});
