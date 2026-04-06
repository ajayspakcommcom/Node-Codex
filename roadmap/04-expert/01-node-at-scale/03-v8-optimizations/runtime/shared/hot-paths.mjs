export function summarizeStableOrders(orders) {
  let confirmedCount = 0;
  let totalValue = 0;

  for (const order of orders) {
    if (order.status === "confirmed") {
      confirmedCount += 1;
    }

    totalValue += order.totalInCents;
  }

  return {
    confirmedCount,
    totalValue,
  };
}

export function summarizeShapeChangingOrders(orders) {
  let confirmedCount = 0;
  let totalValue = 0;

  for (const order of orders) {
    if (order.status === "confirmed") {
      confirmedCount += 1;
    }

    totalValue += order.totalInCents ?? 0;
  }

  return {
    confirmedCount,
    totalValue,
  };
}

export function serializeAuditEvents(events) {
  return JSON.stringify(events);
}

export function allocationHeavyProjection(orders) {
  return orders.map((order) => ({
    ...order,
    displayValue: `${order.orderId}:${order.totalInCents}`,
    isPriority: order.itemCount > 3,
  }));
}

export function boundedProjection(orders) {
  const projected = new Array(orders.length);

  for (let index = 0; index < orders.length; index += 1) {
    const order = orders[index];
    projected[index] = {
      orderId: order.orderId,
      totalInCents: order.totalInCents,
      isPriority: order.itemCount > 3,
    };
  }

  return projected;
}
