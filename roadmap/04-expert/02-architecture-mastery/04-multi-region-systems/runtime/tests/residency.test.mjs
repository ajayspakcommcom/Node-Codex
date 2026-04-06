import test from "node:test";
import assert from "node:assert/strict";
import { ResidencyPolicy } from "../../dist/data-plane/residency-policy.js";

test("residency policy blocks disallowed regions", () => {
  const policy = new ResidencyPolicy();

  assert.equal(policy.isRegionAllowed("eu", "us-east-1"), false);
  assert.equal(policy.isRegionAllowed("eu", "eu-west-1"), true);
});
