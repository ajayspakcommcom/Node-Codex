import { CouplingAnalyzer } from "./module/analysis/coupling-analyzer.js";
import { commerceDependencies } from "./shared/architecture-runtime.js";
import { logger } from "./shared/logger.js";

const analyzer = new CouplingAnalyzer();
const summary = analyzer.summarize(commerceDependencies);

logger.section("Synchronous Call-Chain Risk");
logger.line(`Coupling risk: ${summary.couplingRisk}`);
for (const observation of summary.observations) {
  logger.line(`- ${observation}`);
}
