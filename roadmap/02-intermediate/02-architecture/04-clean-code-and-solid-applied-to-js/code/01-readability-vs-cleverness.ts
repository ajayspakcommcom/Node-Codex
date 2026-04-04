import { logger } from "./shared/logger.js";

const readableVersion = `
function calculateSubtotal(lineItems) {
  return lineItems.reduce((runningTotal, lineItem) => {
    return runningTotal + lineItem.quantity * lineItem.unitPriceInCents;
  }, 0);
}
`;

const cleverVersion = `
const s = (x) => x.reduce((a, b) => a + b.q * b.p, 0);
`;

logger.info("Readability vs cleverness", {
  readableVersion,
  cleverVersion,
  guidance: "Enterprise code should optimize for fast comprehension by reviewers and future maintainers.",
});
