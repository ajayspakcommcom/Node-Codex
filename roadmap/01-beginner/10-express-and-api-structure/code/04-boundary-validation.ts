import type { Middleware } from "./shared/express-like.js";
import { ValidationError } from "./shared/errors.js";

interface CreateOrderBody {
  readonly itemId?: string;
  readonly quantity?: number;
}

const validateCreateOrder: Middleware<CreateOrderBody> = (request, next) => {
  if (!request.body?.itemId) {
    next(new ValidationError("itemId is required"));
    return;
  }

  if (!request.body.quantity || request.body.quantity <= 0) {
    next(new ValidationError("quantity must be greater than zero"));
    return;
  }

  next();
};

validateCreateOrder(
  {
    params: {},
    query: {},
    headers: {},
    body: { itemId: "item_1", quantity: 2 },
  },
  (error?: unknown) => {
    if (error) {
      console.error("Validation failed", error);
      return;
    }

    console.log("Boundary validation passed");
  },
);
