import { performance } from "node:perf_hooks";

export function runBenchmark(name, iterations, workload) {
  for (let index = 0; index < 5_000; index += 1) {
    workload();
  }

  const startedAt = performance.now();
  let lastResult;

  for (let index = 0; index < iterations; index += 1) {
    lastResult = workload();
  }

  const finishedAt = performance.now();
  const durationMs = finishedAt - startedAt;

  console.log(
    JSON.stringify({
      benchmark: name,
      iterations,
      durationMs: Number(durationMs.toFixed(2)),
      iterationsPerMs: Number((iterations / durationMs).toFixed(2)),
      sampleResult: lastResult,
    }),
  );
}
