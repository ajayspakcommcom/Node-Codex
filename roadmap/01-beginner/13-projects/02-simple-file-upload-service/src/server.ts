import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./shared/logger";
import { ensureUploadDirectory } from "./modules/files/storage/disk-storage.service";

async function startServer(): Promise<void> {
  await ensureUploadDirectory();

  app.listen(env.port, () => {
    logger.info("File upload service started", {
      environment: env.nodeEnv,
      port: env.port,
      uploadDir: env.uploadDir,
    });
  });
}

void startServer();
