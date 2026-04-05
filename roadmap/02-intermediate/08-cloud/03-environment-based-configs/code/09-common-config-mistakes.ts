import { logger } from "./shared/logger.js";

logger.warn("Common environment-config mistakes", {
  mistakes: [
    "hardcoding secrets in source or checked-in config files",
    "skipping startup validation for required values",
    "letting local defaults leak into staging or production expectations",
    "treating environment config as undocumented machine setup",
    "changing runtime behavior without making config differences explicit",
  ],
});
