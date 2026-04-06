import test from "node:test";
import assert from "node:assert/strict";
import { captureMemoryReport } from "../shared/memory-report.mjs";

test("memory report includes standard process memory fields", () => {
  const report = captureMemoryReport("test-run");

  assert.equal(report.scenario, "test-run");
  assert.ok(typeof report.heapUsed === "number");
  assert.ok(typeof report.rss === "number");
});
