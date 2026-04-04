interface CreateOrderInput {
  readonly itemId: string;
  readonly quantity: number;
}

function createOrderService(input: CreateOrderInput) {
  const totalItems = input.quantity;

  return {
    id: "ord_service_1",
    itemId: input.itemId,
    totalItems,
    status: "created",
  } as const;
}

console.log("Service layer owns business workflow:", createOrderService({ itemId: "item_7", quantity: 3 }));
