import test from "node:test";
import assert from "node:assert/strict";

import { ConnectionDrainController } from "../../dist/runtime/connection-drain-controller.js";

test("drain controller stops new work and exits only after in-flight requests complete", () => {
  const controller = new ConnectionDrainController();

  assert.equal(controller.acceptRequest("req-1"), true);
  assert.equal(controller.acceptRequest("req-2"), true);

  controller.beginDrain();

  assert.equal(controller.acceptRequest("req-3"), false);
  assert.equal(controller.snapshot().safeToExit, false);

  controller.finishRequest("req-1");
  controller.finishRequest("req-2");

  assert.equal(controller.snapshot().safeToExit, true);
});
