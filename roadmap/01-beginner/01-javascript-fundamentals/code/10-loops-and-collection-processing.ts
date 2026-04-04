type Order = {
  id: string;
  total: number;
  status: "active" | "cancelled";
};

type ActiveOrderSummary = {
  id: string;
  total: number;
};

type OrdersSummary = {
  count: number;
  totalRevenue: number;
  activeOrders: ActiveOrderSummary[];
};

function summarizeOrders(orders: Order[]): OrdersSummary {
  const activeOrders: ActiveOrderSummary[] = [];

  for (const order of orders) {
    if (order.status !== "active") {
      continue;
    }

    activeOrders.push({
      id: order.id,
      total: order.total,
    });
  }

  const totalRevenue = activeOrders.reduce((sum, order) => sum + order.total, 0);

  return {
    count: activeOrders.length,
    totalRevenue,
    activeOrders,
  };
}

const summary = summarizeOrders([
  { id: "ord_1", total: 200, status: "active" },
  { id: "ord_2", total: 150, status: "cancelled" },
  { id: "ord_3", total: 320, status: "active" },
]);

console.log(summary);
