import { logger } from "./shared/logger.js";

const longFunctionSmell = `
async function processInvoice(req, res) {
  // validation
  // total calculation
  // tax calculation
  // discount logic
  // payment gateway call
  // metrics emission
  // response formatting
}
`;

logger.warn("Avoid long functions", {
  longFunctionSmell,
  guidance: "Long functions often hide multiple responsibilities and make review and testing harder.",
});
