interface FeatureConfig {
  readonly retries?: number;
  readonly cacheKey?: string;
}

function badResolveRetries(config: FeatureConfig): number {
  return config.retries || 3;
}

function goodResolveRetries(config: FeatureConfig): number {
  return config.retries ?? 3;
}

function badBuildCacheKey(config: FeatureConfig): string {
  return `key:${config.cacheKey}`;
}

function goodBuildCacheKey(config: FeatureConfig): string {
  return `key:${config.cacheKey ?? "default"}`;
}

console.log({
  badRetries: badResolveRetries({ retries: 0 }),
  goodRetries: goodResolveRetries({ retries: 0 }),
  badCacheKey: badBuildCacheKey({}),
  goodCacheKey: goodBuildCacheKey({}),
});
