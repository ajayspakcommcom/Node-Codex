import { logger } from "./shared/logger.js";

logger.info("PM2 fit vs misfit", {
  goodFit: [
    "single or few Node.js services running directly on VMs or servers",
    "simple server supervision where restart policy and cluster mode still add value",
  ],
  poorFit: [
    "teams that already rely on broader container orchestration as the primary runtime model",
    "environments where PM2 is treated as a substitute for monitoring, deployment discipline, or stateless design",
  ],
});
