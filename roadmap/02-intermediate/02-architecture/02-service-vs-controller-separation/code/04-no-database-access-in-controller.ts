import { logger } from "./shared/logger.js";

const badControllerShape = `
async function createOrder(req, res) {
  const createdOrder = await db.orders.insert({
    customerId: req.body.customerId,
    itemCount: req.body.itemCount,
    totalInCents: req.body.totalInCents
  });

  return res.status(201).json(createdOrder);
}
`;

logger.warn("No database access in controller", {
  badControllerShape,
  guidance: "Controllers should not talk directly to persistence because it couples transport and storage concerns.",
});
