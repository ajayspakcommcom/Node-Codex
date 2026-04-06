import { WorkItem } from "../../shared/horizontal-scaling-types.js";

export class DuplicateWorkService {
  public simulateWithoutCoordination(items: WorkItem[], replicaCount: number): string[] {
    return items.map((item) =>
      item.requiresIdempotency
        ? `${item.id}: ${replicaCount} replicas may race to process this work item`
        : `${item.id}: duplicate processing is tolerable but still noisy`,
    );
  }

  public explainIdempotency(items: WorkItem[]): string[] {
    return items
      .filter((item) => item.requiresIdempotency)
      .map(
        (item) =>
          `${item.id}: requires idempotent handling because scaling increases retry and duplicate-execution risk`,
      );
  }
}
