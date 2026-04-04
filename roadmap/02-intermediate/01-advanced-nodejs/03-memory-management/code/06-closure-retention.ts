import { logger } from "./shared/logger.js";

function createLeakyProcessor(): () => number {
  const heavyRequestContext = {
    requestId: "req-123",
    rawPayload: "x".repeat(500_000),
  };

  return () => heavyRequestContext.rawPayload.length;
}

function createSafeProcessor(): () => number {
  const payloadLength = "x".repeat(500_000).length;
  return () => payloadLength;
}

const leakyProcessor = createLeakyProcessor();
const safeProcessor = createSafeProcessor();

logger.warn("Closure retention example", {
  leakyResult: leakyProcessor(),
  safeResult: safeProcessor(),
  guidance: "Closures can retain entire outer objects when only a small derived value is actually needed.",
});
