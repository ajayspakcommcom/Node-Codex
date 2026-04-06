import { createShapeChangingOrders, createStableOrders } from "../shared/fixtures.mjs";
import {
  summarizeShapeChangingOrders,
  summarizeStableOrders,
} from "../shared/hot-paths.mjs";
import { runBenchmark } from "../shared/benchmark-runner.mjs";

const stableOrders = createStableOrders(5_000);
const shapeChangingOrders = createShapeChangingOrders(5_000);

runBenchmark("stable-order-shape", 10_000, () => summarizeStableOrders(stableOrders));
runBenchmark("shape-changing-order-shape", 10_000, () =>
  summarizeShapeChangingOrders(shapeChangingOrders),
);
