import { createLogger } from "./shared/logger";

const logger = createLogger("workflow-style");

function choreographyExample(): void {
  logger.info("choreography", {
    flow:
      "order.created -> inventory reserved -> payment captured -> shipment requested",
    tradeoff: "Looser coupling but workflow tracing is harder.",
  });
}

function orchestrationExample(): void {
  logger.info("orchestration", {
    flow:
      "workflow service calls each step and decides the next transition explicitly",
    tradeoff: "Clear control flow but stronger central coordination.",
  });
}

choreographyExample();
orchestrationExample();
