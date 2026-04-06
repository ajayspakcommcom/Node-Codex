import { RebalancingEvent } from "../../shared/sharding-types.js";

export class RebalancingService {
  public summarize(events: RebalancingEvent[]): string[] {
    return events.map(
      (event) =>
        `${event.sourceShard} -> ${event.targetShard}: move ${event.movedPartitions} partitions (${event.riskLevel} risk)`,
    );
  }

  public advice(): string[] {
    return [
      "Plan data movement before scale forces emergency redistribution.",
      "Rebalancing changes throughput, latency, and failure risk while it is in progress.",
    ];
  }
}
