import { createLogger } from "./shared/logger.js";

interface StableOrderSummary {
  readonly orderId: string;
  readonly itemCount: number;
  readonly totalInCents: number;
  readonly status: "pending" | "confirmed";
}

const logger = createLogger("v8-optimizations");

function buildStableSummary(
  orderId: string,
  itemCount: number,
  totalInCents: number,
  status: StableOrderSummary["status"],
): StableOrderSummary {
  return {
    orderId,
    itemCount,
    totalInCents,
    status,
  };
}

const summaries = [
  buildStableSummary("ord_1", 3, 12000, "confirmed"),
  buildStableSummary("ord_2", 1, 4999, "pending"),
];

logger.info("stable_shape_example", {
  summaryCount: summaries.length,
  note: "Stable field order and field presence help keep hot paths predictable.",
});
