import { logger } from "./shared/logger.js";

async function failingDependencyCall(): Promise<void> {
  throw new Error("Dependency request failed.");
}

async function safeBoundary(): Promise<void> {
  try {
    await failingDependencyCall();
  } catch (error) {
    logger.error("Async error was caught at the service boundary", {
      error,
    });
  }
}

void safeBoundary();

logger.warn("Unhandled rejection awareness", {
  guidance:
    "In production code, never start important async work without awaiting it or attaching explicit rejection handling.",
});
