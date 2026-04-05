import { logger } from "./shared/logger.js";
import { localConfig } from "./shared/config-runtime.js";
import { ConfigLoader } from "./module/config/config-loader.js";

const loader = new ConfigLoader();

logger.info("Config loading basics", {
  loadedConfig: loader.load(localConfig),
});
