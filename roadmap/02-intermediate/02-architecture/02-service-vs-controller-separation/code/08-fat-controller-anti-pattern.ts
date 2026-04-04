import { logger } from "./shared/logger.js";

const fatControllerExample = `
async function confirmOrder(req, res) {
  if (!req.body.customerId || !req.body.itemCount) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const inventory = await inventoryClient.check(req.body.customerId);
  if (!inventory.available) {
    return res.status(409).json({ message: "Inventory unavailable" });
  }

  const order = await db.orders.insert(req.body);
  await auditClient.track("order-confirmed", order);
  return res.status(201).json(order);
}
`;

logger.warn("Fat controller anti-pattern", {
  fatControllerExample,
  guidance: "Controllers become unmaintainable when they own validation, orchestration, persistence, and side effects together.",
});
