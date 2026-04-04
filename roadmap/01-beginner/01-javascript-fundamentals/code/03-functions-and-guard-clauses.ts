type OrderItem = {
  sku: string;
  price: number;
  quantity: number;
};

type CreateOrderPayload = {
  customerId: string;
  items: OrderItem[];
};

type CreatedOrder = {
  customerId: string;
  itemCount: number;
  total: number;
  status: "created";
};

function validateCreateOrderInput(payload: CreateOrderPayload | undefined): asserts payload is CreateOrderPayload {
  if (!payload) {
    throw new Error("Payload is required");
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error("At least one item is required");
  }

  if (typeof payload.customerId !== "string" || payload.customerId.trim() === "") {
    throw new Error("customerId is required");
  }
}

function calculateOrderTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

function createOrder(payload: CreateOrderPayload | undefined): CreatedOrder {
  validateCreateOrderInput(payload);

  const total = calculateOrderTotal(payload.items);

  return {
    customerId: payload.customerId,
    itemCount: payload.items.length,
    total,
    status: "created",
  };
}

const order = createOrder({
  customerId: "cus_9001",
  items: [
    { sku: "bk-1", price: 100, quantity: 2 },
    { sku: "bk-2", price: 50, quantity: 1 },
  ],
});

console.log(order);
