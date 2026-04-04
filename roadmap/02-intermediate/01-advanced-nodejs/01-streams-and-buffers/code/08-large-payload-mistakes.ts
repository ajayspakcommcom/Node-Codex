import { logger } from "./shared/logger";

function badLargePayloadApproach(): void {
  const hugeInMemoryString = "x".repeat(5_000_000);

  logger.warn("Bad pattern", {
    bytesAllocated: Buffer.byteLength(hugeInMemoryString),
    guidance: "Loading large generated responses into one string or buffer can increase memory pressure sharply.",
  });
}

function correctedApproach(): void {
  logger.info("Corrected approach", {
    guidance: "Generate or forward large payloads incrementally with streams when possible.",
  });
}

badLargePayloadApproach();
correctedApproach();
