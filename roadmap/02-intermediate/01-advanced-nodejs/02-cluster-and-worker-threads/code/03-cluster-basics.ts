import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { createServer } from "node:http";

import { logger } from "./shared/logger.js";

if (cluster.isPrimary) {
  const workerCount = Math.min(availableParallelism(), 2);

  logger.info("Primary process starting clustered workers", {
    workerCount,
  });

  for (let index = 0; index < workerCount; index += 1) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    logger.warn("Cluster worker exited", {
      workerId: worker.id,
      code,
      signal,
    });
  });
} else {
  const server = createServer((_request, response) => {
    response.writeHead(200, {
      "content-type": "application/json",
    });
    response.end(
      JSON.stringify({
        workerPid: process.pid,
      }),
    );
  });

  server.listen(0, () => {
    logger.info("Cluster worker listening", {
      pid: process.pid,
      address: server.address(),
      guidance: "Cluster spreads incoming traffic across processes; it does not replace worker threads for CPU-heavy task isolation.",
    });
    server.close();
  });
}
