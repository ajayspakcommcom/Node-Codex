import type { Handler } from "./shared/express-like.js";
import { created } from "./shared/response.js";

interface CreateOrderBody {
  readonly itemId: string;
  readonly quantity: number;
}

function createOrderService(input: CreateOrderBody) {
  return {
    id: "ord_1001",
    itemId: input.itemId,
    quantity: input.quantity,
    status: "created",
  } as const;
}

const createOrderController: Handler<CreateOrderBody> = (request) => {
  const result = createOrderService({
    itemId: request.body!.itemId,
    quantity: request.body!.quantity,
  });

  return created({ data: result });
};

console.log(
  createOrderController({
    params: {},
    query: {},
    headers: {},
    body: { itemId: "item_1", quantity: 2 },
  }),
);
