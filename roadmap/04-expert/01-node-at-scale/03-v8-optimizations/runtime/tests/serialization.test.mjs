import test from "node:test";
import assert from "node:assert/strict";
import { createAuditEvents } from "../shared/fixtures.mjs";
import { serializeAuditEvents } from "../shared/hot-paths.mjs";

test("serialization returns a non-empty JSON payload", () => {
  const events = createAuditEvents(10);
  const serialized = serializeAuditEvents(events);

  assert.ok(serialized.includes("order.updated"));
  assert.ok(serialized.length > 0);
});
