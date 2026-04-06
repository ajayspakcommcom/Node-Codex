import { createLogger } from "./shared/logger.js";

const logger = createLogger("memory-gc-tuning");

const requestBuffer = Buffer.from("sensitive-payload-that-should-not-live-too-long");
const retainedSlices = [requestBuffer.subarray(0, 10), requestBuffer.subarray(10, 20)];

logger.warn("buffer_retention_example", {
  originalLength: requestBuffer.length,
  retainedSliceCount: retainedSlices.length,
  note: "Retained buffer slices can keep larger backing memory alive longer than expected.",
});
