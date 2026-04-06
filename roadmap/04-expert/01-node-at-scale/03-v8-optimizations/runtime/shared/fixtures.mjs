export function createStableOrders(count) {
  return Array.from({ length: count }, (_, index) => ({
    orderId: `ord_${index}`,
    itemCount: (index % 5) + 1,
    totalInCents: (index + 1) * 137,
    status: index % 2 === 0 ? "confirmed" : "pending",
  }));
}

export function createShapeChangingOrders(count) {
  return Array.from({ length: count }, (_, index) => {
    const payload = {
      orderId: `ord_${index}`,
    };

    if (index % 2 === 0) {
      payload.itemCount = (index % 5) + 1;
    }

    if (index % 3 === 0) {
      payload.totalInCents = (index + 1) * 137;
    }

    if (index % 5 === 0) {
      payload.status = "confirmed";
    }

    if (index % 7 === 0) {
      payload.region = "in";
    }

    return payload;
  });
}

export function createAuditEvents(count) {
  return Array.from({ length: count }, (_, index) => ({
    eventType: "order.updated",
    orderId: `ord_${index}`,
    customerId: `cus_${index}`,
    timestamp: `2026-04-06T10:${String(index % 60).padStart(2, "0")}:00.000Z`,
    metadata: {
      region: index % 2 === 0 ? "in" : "us",
      status: index % 3 === 0 ? "confirmed" : "pending",
    },
  }));
}
