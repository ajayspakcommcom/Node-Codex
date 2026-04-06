import { createLogger } from "./shared/logger";

const logger = createLogger({
  service: "queue-worker",
  environment: "production",
  version: "2026.04.06",
});

logger.info("job_processing_started", {
  jobId: "job_1",
  requestId: "req_from_origin",
  traceId: "trace_22",
  queueName: "invoice-generation",
});

logger.info("job_processing_completed", {
  jobId: "job_1",
  durationMs: 182,
});
