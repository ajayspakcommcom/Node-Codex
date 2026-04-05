export class CacheMetricsService {
  private readonly hits = new Map<string, number>();
  private readonly misses = new Map<string, number>();
  private readonly invalidations = new Map<string, number>();
  private readonly fallbacks = new Map<string, number>();

  public recordHit(area: string): void {
    this.hits.set(area, (this.hits.get(area) ?? 0) + 1);
  }

  public recordMiss(area: string): void {
    this.misses.set(area, (this.misses.get(area) ?? 0) + 1);
  }

  public recordInvalidation(area: string): void {
    this.invalidations.set(area, (this.invalidations.get(area) ?? 0) + 1);
  }

  public recordFallback(area: string): void {
    this.fallbacks.set(area, (this.fallbacks.get(area) ?? 0) + 1);
  }

  public snapshot(): {
    readonly hits: Readonly<Record<string, number>>;
    readonly misses: Readonly<Record<string, number>>;
    readonly invalidations: Readonly<Record<string, number>>;
    readonly fallbacks: Readonly<Record<string, number>>;
  } {
    return {
      hits: Object.fromEntries(this.hits),
      misses: Object.fromEntries(this.misses),
      invalidations: Object.fromEntries(this.invalidations),
      fallbacks: Object.fromEntries(this.fallbacks),
    };
  }
}
