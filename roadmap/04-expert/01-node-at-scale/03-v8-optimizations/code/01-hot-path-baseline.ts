import { createLogger } from "./shared/logger.js";

interface FeedItem {
  readonly sku: string;
  readonly title: string;
  readonly priceInCents: number;
  readonly available: boolean;
}

const logger = createLogger("v8-optimizations");

function summarizeFeed(items: readonly FeedItem[]) {
  let availableCount = 0;
  let totalValue = 0;

  for (const item of items) {
    if (item.available) {
      availableCount += 1;
      totalValue += item.priceInCents;
    }
  }

  return {
    availableCount,
    totalValue,
  };
}

const result = summarizeFeed([
  { sku: "sku_100", title: "Laptop", priceInCents: 99999, available: true },
  { sku: "sku_101", title: "Mouse", priceInCents: 2999, available: true },
]);

logger.info("hot_path_baseline_recorded", {
  result,
  note: "Profile this path before changing implementation details.",
});
