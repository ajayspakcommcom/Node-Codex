type CacheKeyBuilder = {
  prefix: string;
  build(userId: string): string;
};

const cacheKeyBuilder: CacheKeyBuilder = {
  prefix: "session",
  build(userId: string): string {
    return `${this.prefix}:${userId}`;
  },
};

function buildCacheKey(prefix: string, userId: string): string {
  return `${prefix}:${userId}`;
}

console.log("Method style:", cacheKeyBuilder.build("usr_7001"));
console.log("Explicit parameter style:", buildCacheKey("session", "usr_7001"));

const detachedBuild = cacheKeyBuilder.build.bind(cacheKeyBuilder);
console.log("Bound method:", detachedBuild("usr_7002"));
