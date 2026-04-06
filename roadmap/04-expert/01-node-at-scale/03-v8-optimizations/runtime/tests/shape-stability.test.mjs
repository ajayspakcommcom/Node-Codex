import test from "node:test";
import assert from "node:assert/strict";
import { createShapeChangingOrders, createStableOrders } from "../shared/fixtures.mjs";
import {
  summarizeShapeChangingOrders,
  summarizeStableOrders,
  allocationHeavyProjection,
  boundedProjection,
} from "../shared/hot-paths.mjs";

test("stable and shape-changing paths produce consistent totals for equivalent populated fields", () => {
  const stableOrders = createStableOrders(100);
  const shapeChangingOrders = stableOrders.map((order, index) => {
    const payload = { orderId: order.orderId };

    if (index % 2 === 0 || order.itemCount) {
      payload.itemCount = order.itemCount;
    }

    payload.totalInCents = order.totalInCents;
    payload.status = order.status;

    return payload;
  });

  const stableSummary = summarizeStableOrders(stableOrders);
  const unstableSummary = summarizeShapeChangingOrders(shapeChangingOrders);

  assert.deepEqual(unstableSummary, stableSummary);
});

test("shape-changing fixtures are actually non-uniform", () => {
  const unstableOrders = createShapeChangingOrders(30);
  const keyShapes = new Set(unstableOrders.map((order) => Object.keys(order).sort().join(",")));

  assert.ok(keyShapes.size > 1);
});

test("bounded projection preserves list size and priority semantics", () => {
  const stableOrders = createStableOrders(20);

  const allocationHeavy = allocationHeavyProjection(stableOrders);
  const bounded = boundedProjection(stableOrders);

  assert.equal(allocationHeavy.length, bounded.length);
  assert.equal(allocationHeavy[5].isPriority, bounded[5].isPriority);
});
