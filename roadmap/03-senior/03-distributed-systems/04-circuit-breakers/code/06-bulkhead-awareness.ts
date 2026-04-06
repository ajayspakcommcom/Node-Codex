import { createLogger } from "./shared/logger";

const logger = createLogger("bulkhead");

interface DependencyPool {
  readonly dependency: string;
  readonly concurrentSlots: number;
}

const pools: readonly DependencyPool[] = [
  { dependency: "payment-gateway", concurrentSlots: 20 },
  { dependency: "email-service", concurrentSlots: 10 },
];

logger.info("bulkhead_awareness", {
  pools,
  note: "Separate dependency capacity limits reduce cross-dependency blast radius.",
});
