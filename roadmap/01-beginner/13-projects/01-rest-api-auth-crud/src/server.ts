import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger";

app.listen(env.port, () => {
  logger.info("Server started", {
    environment: env.nodeEnv,
    port: env.port,
  });
});
