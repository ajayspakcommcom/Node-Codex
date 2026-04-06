import { ListenerRegistry } from "./module/services/listener-registry.js";
import { memoryRuntime } from "./shared/memory-runtime.js";
import { logger } from "./shared/logger.js";

const registry = new ListenerRegistry();

for (let index = 0; index < 10; index += 1) {
  registry.add("job:completed");
}

const listeners = registry.snapshot();

logger.warn("Listener retention risk", {
  listeners,
  warningThreshold: memoryRuntime.listenerWarningThreshold,
  riskDetected: (listeners["job:completed"] ?? 0) > memoryRuntime.listenerWarningThreshold,
});
