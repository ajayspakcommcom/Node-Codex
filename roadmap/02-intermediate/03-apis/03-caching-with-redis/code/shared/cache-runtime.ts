import type { CacheMetricsSnapshot } from "./cache-types.js";

export function buildCacheKey(...parts: readonly string[]): string {
  return parts.join(":");
}

export function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export class CacheMetrics {
  private readonly hits = new Map<string, number>();
  private readonly misses = new Map<string, number>();
  private readonly invalidations = new Map<string, number>();
  private readonly fallbacks = new Map<string, number>();

  public recordHit(area: string): void {
    this.increment(this.hits, area);
  }

  public recordMiss(area: string): void {
    this.increment(this.misses, area);
  }

  public recordInvalidation(area: string): void {
    this.increment(this.invalidations, area);
  }

  public recordFallback(area: string): void {
    this.increment(this.fallbacks, area);
  }

  public snapshot(): CacheMetricsSnapshot {
    return {
      hits: Object.fromEntries(this.hits),
      misses: Object.fromEntries(this.misses),
      invalidations: Object.fromEntries(this.invalidations),
      fallbacks: Object.fromEntries(this.fallbacks),
    };
  }

  private increment(counter: Map<string, number>, key: string): void {
    counter.set(key, (counter.get(key) ?? 0) + 1);
  }
}
