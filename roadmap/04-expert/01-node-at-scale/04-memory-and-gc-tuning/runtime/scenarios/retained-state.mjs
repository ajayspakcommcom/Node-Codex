import { printMemoryReport } from "../shared/memory-report.mjs";

const retainedPayloads = [];

for (let index = 0; index < 3_000; index += 1) {
  retainedPayloads.push({
    id: index,
    body: "z".repeat(1_024),
  });
}

printMemoryReport("retained_state_run", {
  retainedCount: retainedPayloads.length,
});
