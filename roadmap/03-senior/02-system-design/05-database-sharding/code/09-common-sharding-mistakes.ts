import { logger } from "./shared/logger.js";

logger.section("Common Sharding Mistakes");
const mistakes = [
  "Sharding before exhausting simpler scale paths.",
  "Choosing shard keys without validating query shape.",
  "Letting cross-shard queries become normal request paths.",
  "Ignoring skew until one shard becomes the real bottleneck.",
  "Treating rebalancing as easy background work.",
];

for (const mistake of mistakes) {
  logger.line(`- ${mistake}`);
}
