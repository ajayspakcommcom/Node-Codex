import { logger } from "./shared/logger.js";

const cohesiveModuleDescription = {
  moduleName: "InvoiceService",
  responsibilities: ["validate invoice input", "calculate totals", "charge invoice"],
};

logger.info("Naming and cohesion example", {
  cohesiveModuleDescription,
  rule: "Names should reveal role clearly, and modules should group related reasons to change.",
});
