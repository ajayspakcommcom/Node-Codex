import { logger } from "./shared/logger.js";

const mistakes = [
  "Creating a new version for every additive field instead of reserving versions for meaningful contract breaks.",
  "Copy-pasting whole controllers and services until each version becomes a separate application.",
  "Deprecating old versions without usage metrics or consumer outreach.",
  "Versioning only the success payload while letting error contracts change silently.",
  "Keeping header-based versioning invisible in logs and support tooling.",
];

logger.warn("Common versioning mistakes", {
  mistakes,
  guidance: "Versioning should reduce change risk. If it mainly increases duplication and confusion, the boundary is probably in the wrong place.",
});
