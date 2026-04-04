import { logger } from "./shared/logger.js";

const serviceDumpExample = `
class OrderService {
  validateOrder() {}
  createOrder() {}
  sendEmail() {}
  exportInvoices() {}
  rebuildSearchIndex() {}
  syncAnalytics() {}
}
`;

logger.warn("Service dump anti-pattern", {
  serviceDumpExample,
  guidance: "A service layer should hold cohesive business workflows, not become a dump for every unrelated operation.",
});
