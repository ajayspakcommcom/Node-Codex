import { EventEmitter } from "node:events";

import { BoundedCache } from "./shared/bounded-cache.js";
import { logger } from "./shared/logger.js";

class MetricsCollector {
  private readonly emitter = new EventEmitter();
  private readonly requestCache = new BoundedCache<string>(50, 30_000);

  public constructor() {
    this.emitter.on("request-finished", this.onRequestFinished);
  }

  public storeResponseSummary(requestId: string, summary: string): void {
    this.requestCache.set(requestId, summary);
  }

  public shutdown(): void {
    this.emitter.removeListener("request-finished", this.onRequestFinished);
  }

  private readonly onRequestFinished = (payload: { readonly requestId: string }) => {
    logger.info("Request finished", {
      requestId: payload.requestId,
      cacheSize: this.requestCache.size(),
    });
  };
}

const collector = new MetricsCollector();
collector.storeResponseSummary("req-1", "response-summary");
collector.shutdown();

logger.info("Maintainable memory pattern", {
  rule: "Bound long-lived structures and clean up listeners when the owning component shuts down.",
});
