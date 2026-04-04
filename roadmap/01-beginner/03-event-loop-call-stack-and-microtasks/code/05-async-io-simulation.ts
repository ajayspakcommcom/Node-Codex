import { createLogger } from "./shared/logger.js";
import { wait } from "./shared/timing.js";

const logger = createLogger("inventory-service");

async function fetchProduct(productId: string): Promise<{ id: string; stock: number }> {
  logger.info("Starting async I/O", { productId });
  await wait(40);
  return { id: productId, stock: 42 };
}

async function main(): Promise<void> {
  logger.info("Before fetch");
  const promise = fetchProduct("prd_100");
  logger.info("While waiting, event loop is free for other work");
  const product = await promise;
  logger.info("After fetch", product);
}

void main();
