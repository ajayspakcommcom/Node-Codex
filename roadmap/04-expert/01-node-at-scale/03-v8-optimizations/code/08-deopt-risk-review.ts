import { createLogger } from "./shared/logger.js";

const logger = createLogger("v8-optimizations");

const deoptRiskChecklist = [
  "object shapes change per request",
  "hot-path functions accept inconsistent input shapes",
  "parsing and serialization dominate CPU time",
  "large temporary arrays are created on every request",
  "runtime-sensitive code lacks a measurement note",
];

logger.warn("deopt_risk_review_created", {
  checklistSize: deoptRiskChecklist.length,
  note: "Use this kind of checklist before writing V8-specific code changes.",
});
