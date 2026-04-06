import { printMemoryReport } from "../shared/memory-report.mjs";

function createTransientRecords(count) {
  const records = new Array(count);

  for (let index = 0; index < count; index += 1) {
    records[index] = {
      orderId: `ord_${index}`,
      serialized: JSON.stringify({
        index,
        payload: "y".repeat(256),
      }),
    };
  }

  return records;
}

for (let round = 0; round < 20; round += 1) {
  createTransientRecords(2_000);
}

printMemoryReport("allocation_pressure_run", {
  rounds: 20,
  recordsPerRound: 2_000,
});
