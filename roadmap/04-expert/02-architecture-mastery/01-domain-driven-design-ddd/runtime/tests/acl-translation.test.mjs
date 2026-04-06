import test from "node:test";
import assert from "node:assert/strict";
import { LegacyBillingAdapter } from "../../dist/contexts/billing/acl/legacy-billing-adapter.js";

test("anti-corruption layer translates order charge into legacy billing contract", () => {
  const adapter = new LegacyBillingAdapter();

  const command = adapter.translateOrderCharge({
    orderId: "ord_301",
    customerId: "cus_301",
    amountInCents: 7500,
    currency: "INR",
  });

  assert.deepEqual(command, {
    account_code: "cus_301",
    invoice_reference: "ord_301",
    charge_amount_minor: 7500,
    charge_currency: "INR",
  });
});
