import { logger } from "./shared/logger.js";

const additiveChangeExample = {
  previousContract: {
    id: "ord_1001",
    totalInCents: 12500,
    status: "approved",
  },
  evolvedContract: {
    id: "ord_1001",
    totalInCents: 12500,
    status: "approved",
    supportReference: "SUP-1001",
  },
  classification: "Usually backward-compatible if consumers tolerate additional fields.",
};

const breakingChangeExample = {
  previousRequestShape: {
    customerId: "cust_enterprise",
    totalInCents: 12500,
  },
  newRequestShape: {
    customerId: "cust_enterprise",
    total: {
      amountInCents: 12500,
      currency: "USD",
    },
  },
  classification: "Breaking because existing clients cannot send the new shape safely without changes.",
};

logger.info("Breaking vs additive changes", {
  additiveChangeExample,
  breakingChangeExample,
  guidance: "Enterprise teams classify change impact before implementation so version decisions are deliberate rather than reactive.",
});
