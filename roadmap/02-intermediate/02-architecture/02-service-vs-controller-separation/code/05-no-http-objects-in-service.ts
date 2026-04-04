import { logger } from "./shared/logger.js";

const badServiceShape = `
class OrderService {
  async createOrder(req, res) {
    if (!req.body.customerId) {
      return res.status(400).json({ message: "Missing customerId" });
    }
  }
}
`;

logger.warn("No HTTP objects in service", {
  badServiceShape,
  guidance: "Services should not depend on req/res objects because that couples business logic to one transport framework.",
});
