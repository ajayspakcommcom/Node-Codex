import { processRef } from "./shared/node-runtime.js";

type RuntimeSummary = {
  nodeVersion: string;
  platform: string;
  runtime: "node";
  hasGlobalFetch: boolean;
};

const runtimeSummary: RuntimeSummary = {
  nodeVersion: processRef?.version ?? "unknown",
  platform: processRef?.platform ?? "unknown",
  runtime: "node",
  hasGlobalFetch: typeof globalThis.fetch === "function",
};

console.log("Runtime summary:", runtimeSummary);
