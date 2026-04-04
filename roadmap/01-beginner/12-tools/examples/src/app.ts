import { loadConfig } from "@config/env";
import { UserService } from "@modules/users/user-service";
import { Logger } from "@shared/logger";

const config = loadConfig();
const logger = new Logger({
  service: config.serviceName,
  level: config.logLevel,
});
const userService = new UserService();

logger.info("Starting application", {
  environment: config.nodeEnv,
  port: config.port,
});

logger.info("Loaded active users", {
  users: userService.listActiveUsers(),
});
