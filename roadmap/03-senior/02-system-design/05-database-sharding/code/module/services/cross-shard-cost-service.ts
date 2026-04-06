import { QueryPattern } from "../../shared/sharding-types.js";

export class CrossShardCostService {
  public analyze(patterns: QueryPattern[]): string[] {
    return patterns.map((pattern) => {
      if (pattern.requiresCrossShardFanout) {
        return `${pattern.description}: expensive fan-out path requiring aggregation across shards`;
      }

      if (!pattern.usesShardKey) {
        return `${pattern.description}: routing predictability is weak`;
      }

      return `${pattern.description}: shard-aware and predictable`;
    });
  }

  public transactionRisk(): string {
    return "Cross-shard transactions should be rare because they expand coordination and failure complexity.";
  }
}
