import { logger } from "./shared/logger.js";

class HiddenBehaviorInvoiceProcessor {
  private shouldChargeImmediately = true;

  public process(): string {
    if (this.shouldChargeImmediately) {
      return "charged";
    }

    return "queued";
  }
}

logger.warn("Explicitness over hidden behavior", {
  issue: "The processing mode is hidden inside object state instead of being made explicit at the call site.",
  exampleResult: new HiddenBehaviorInvoiceProcessor().process(),
});
