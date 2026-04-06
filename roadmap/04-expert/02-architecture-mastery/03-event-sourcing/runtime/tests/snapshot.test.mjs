import test from "node:test";
import assert from "node:assert/strict";
import { OrderStream } from "../../dist/domain/order-stream.js";

test("snapshot plus later events restores aggregate state", () => {
  const created = OrderStream.create("order-2", "customer-2", 9_500);
  const snapshot = created.toSnapshot();

  const restored = OrderStream.restore(snapshot, [
    {
      type: "order-confirmed",
      version: 1,
      payload: {
        orderId: "order-2",
      },
    },
  ]);

  assert.equal(restored.status, "confirmed");
  assert.equal(restored.orderId, "order-2");
});
