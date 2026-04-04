import { logger } from "./shared/logger";

const smallPayloadBuffer = Buffer.from("enterprise-buffer-example", "utf8");
const binaryHeader = Buffer.from([0xde, 0xad, 0xbe, 0xef]);
const combinedPayload = Buffer.concat([binaryHeader, smallPayloadBuffer]);

logger.info("Bounded buffer usage", {
  byteLength: smallPayloadBuffer.byteLength,
  preview: smallPayloadBuffer.toString("utf8"),
});

logger.info("Combined payload metadata", {
  totalBytes: combinedPayload.byteLength,
  firstFourBytes: [...combinedPayload.subarray(0, 4)],
});

logger.warn("Enterprise rule", {
  guidance: "Use buffers for bounded binary chunks, not as the default large-payload strategy.",
});
