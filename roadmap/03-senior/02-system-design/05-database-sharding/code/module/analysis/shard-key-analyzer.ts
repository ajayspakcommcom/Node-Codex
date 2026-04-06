import { ShardKeyCandidate } from "../../shared/sharding-types.js";

export class ShardKeyAnalyzer {
  public compare(candidates: ShardKeyCandidate[]): string[] {
    return candidates.map((candidate) => {
      return `${candidate.name}: distribution=${candidate.distributionPredictability}, routing=${candidate.routingSimplicity}, hotspotRisk=${candidate.hotspotRisk}`;
    });
  }

  public recommend(candidates: ShardKeyCandidate[]): string {
    const ranked = [...candidates].sort((left, right) => {
      const score = (candidate: ShardKeyCandidate): number => {
        const distributionScore =
          candidate.distributionPredictability === "high"
            ? 3
            : candidate.distributionPredictability === "medium"
              ? 2
              : 1;
        const hotspotPenalty =
          candidate.hotspotRisk === "high"
            ? 3
            : candidate.hotspotRisk === "medium"
              ? 2
              : 1;
        return distributionScore - hotspotPenalty;
      };

      return score(right) - score(left);
    });

    return `Recommended candidate: ${ranked[0]?.name ?? "unknown"}`;
  }
}
