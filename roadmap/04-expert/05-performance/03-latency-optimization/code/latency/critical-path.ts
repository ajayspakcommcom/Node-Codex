export interface PathSegment {
  name: string;
  latencyMs: number;
}

export interface CriticalPath {
  requestName: string;
  segments: readonly PathSegment[];
}

export function createDefaultCriticalPath(): CriticalPath {
  return {
    requestName: "product-feed-request",
    segments: [
      { name: "gateway", latencyMs: 20 },
      { name: "catalog-service", latencyMs: 80 },
      { name: "search-service", latencyMs: 95 },
      { name: "serialization", latencyMs: 25 },
    ],
  };
}
