import { createStableOrders } from "../shared/fixtures.mjs";
import { allocationHeavyProjection, boundedProjection } from "../shared/hot-paths.mjs";
import { runBenchmark } from "../shared/benchmark-runner.mjs";

const stableOrders = createStableOrders(5_000);

runBenchmark("allocation-heavy-projection", 5_000, () =>
  allocationHeavyProjection(stableOrders).length,
);
runBenchmark("bounded-projection", 5_000, () => boundedProjection(stableOrders).length);
