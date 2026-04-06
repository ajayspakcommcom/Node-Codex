import { createAuditEvents } from "../shared/fixtures.mjs";
import { serializeAuditEvents } from "../shared/hot-paths.mjs";
import { runBenchmark } from "../shared/benchmark-runner.mjs";

const auditEvents = createAuditEvents(2_000);

runBenchmark("audit-event-serialization", 5_000, () =>
  serializeAuditEvents(auditEvents).length,
);
