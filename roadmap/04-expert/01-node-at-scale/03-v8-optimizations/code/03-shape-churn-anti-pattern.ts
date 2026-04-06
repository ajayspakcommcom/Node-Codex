import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

function buildShapeChangingPayload(index: number): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    orderId: `ord_${index}`,
  };

  if (index % 2 === 0) {
    payload.totalInCents = index * 100;
  }

  if (index % 3 === 0) {
    payload.discountCode = "SALE";
  }

  if (index % 5 === 0) {
    payload.region = "in";
  }

  return payload;
}

const shapeChangingPayloads = Array.from({ length: 10 }, (_, index) =>
  buildShapeChangingPayload(index + 1),
);

logger.warn("shape_churn_detected", {
  payloadCount: shapeChangingPayloads.length,
  note: "Changing field sets across hot objects can create unstable runtime behavior.",
});
