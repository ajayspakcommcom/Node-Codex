import { createLogger } from "./shared/logger.js";
import { ConcurrencyLimiter } from "./shared/concurrency-limiter.js";

const logger = createLogger("high-throughput-services");
const limiter = new ConcurrencyLimiter(200);

void limiter
  .run(async () => ({ dependency: "catalog-db", status: "ok" }))
  .then((result) => {
    logger.info("bounded_concurrency_example", result);
  });
