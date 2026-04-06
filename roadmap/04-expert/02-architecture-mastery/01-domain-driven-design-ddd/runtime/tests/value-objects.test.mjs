import test from "node:test";
import assert from "node:assert/strict";
import { Money } from "../../dist/contexts/orders/domain/money.js";
import { Quantity } from "../../dist/contexts/orders/domain/quantity.js";

test("money rejects negative values", () => {
  assert.throws(() => Money.fromCents(-1, "INR"), /cannot be negative/);
});

test("money prevents currency mismatch", () => {
  const inr = Money.fromCents(100, "INR");
  const usd = Money.fromCents(100, "USD");

  assert.throws(() => inr.add(usd), /currency mismatch/);
});

test("quantity requires positive integers", () => {
  assert.throws(() => Quantity.of(0), /positive integer/);
  assert.throws(() => Quantity.of(1.5), /positive integer/);
});
