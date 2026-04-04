import { logger } from "./shared/logger.js";

const codeSmells = [
  "Unclear names that hide responsibility",
  "Functions that validate, persist, emit side effects, and format output all at once",
  "Repeated normalization or mapping logic in multiple files",
  "Services that know too much about framework or vendor internals",
];

for (const smell of codeSmells) {
  logger.warn("Code smell detected", {
    smell,
  });
}

logger.info("Refactoring guidance", {
  guidance: "Refactor when structure is increasing change cost, not only when code looks untidy.",
});
