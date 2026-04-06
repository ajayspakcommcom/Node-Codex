import test from "node:test";
import assert from "node:assert/strict";
import { createImageHasherWithBinding } from "../src/index.js";

test("falls back to JavaScript when native binding is unavailable", () => {
  const hasher = createImageHasherWithBinding(undefined);
  const result = hasher.hash(Buffer.from("abc"));

  assert.equal(result.executionPath, "fallback");
  assert.equal(result.algorithm, "js-fallback-hash");
  assert.ok(result.hash.length > 0);
});

test("uses native binding when provided", () => {
  const hasher = createImageHasherWithBinding({
    hashImage() {
      return {
        algorithm: "native-simple-hash",
        hash: "12345",
      };
    },
  });

  const result = hasher.hash(Buffer.from("abc"));

  assert.equal(result.executionPath, "native");
  assert.equal(result.algorithm, "native-simple-hash");
  assert.equal(result.hash, "12345");
});
