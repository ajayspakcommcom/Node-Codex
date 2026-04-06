import test from "node:test";
import assert from "node:assert/strict";
import { loadNativeBinding } from "../src/native-loader.js";

test("returns undefined when no compiled addon artifact exists", () => {
  const binding = loadNativeBinding();

  assert.equal(binding, undefined);
});
