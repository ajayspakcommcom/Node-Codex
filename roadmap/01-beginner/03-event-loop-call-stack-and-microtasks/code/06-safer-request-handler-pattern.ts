import { createLogger } from "./shared/logger.js";
import { wait } from "./shared/timing.js";

const logger = createLogger("reports-api");

function badGenerateLargeReport(): string {
  const rows: string[] = [];

  for (let index = 0; index < 100000; index += 1) {
    rows.push(`row-${index}`);
  }

  return rows.join(",");
}

async function queueReportGeneration(reportId: string): Promise<{ reportId: string; status: "queued" }> {
  await wait(10);
  return {
    reportId,
    status: "queued",
  };
}

async function main(): Promise<void> {
  logger.info("Bad request-path pattern starts");
  const reportPayload = badGenerateLargeReport();
  logger.info("Bad request-path pattern completed", { payloadLength: reportPayload.length });

  logger.info("Safer enterprise pattern starts");
  const queued = await queueReportGeneration("rpt_1001");
  logger.info("Safer enterprise pattern completed", queued);
}

void main();
