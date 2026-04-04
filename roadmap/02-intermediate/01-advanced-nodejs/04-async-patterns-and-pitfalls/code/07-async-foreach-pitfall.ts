import { fetchDependency } from "./shared/fake-clients.js";
import { logger } from "./shared/logger.js";

const ids = ["a", "b", "c"];

async function badPattern(): Promise<void> {
  ids.forEach(async (id) => {
    await fetchDependency(id, 20);
    logger.warn("forEach async callback completed", {
      id,
    });
  });

  logger.warn("Bad pattern returned early", {
    guidance: "forEach does not wait for async callbacks, so completion is not tracked properly.",
  });
}

async function correctedPattern(): Promise<void> {
  for (const id of ids) {
    await fetchDependency(id, 20);
  }

  logger.info("Corrected loop completed explicitly", {
    idsProcessed: ids.length,
  });
}

void badPattern().then(correctedPattern);
