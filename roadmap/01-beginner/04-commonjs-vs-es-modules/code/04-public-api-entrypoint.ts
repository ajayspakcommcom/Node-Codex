import { normalizeCharge, type ChargeInput } from "./shared/public-api/index.js";

const chargeInput: ChargeInput = {
  invoiceId: "inv_1001",
  amount: 4999,
};

console.log("Public API result:", normalizeCharge(chargeInput));
