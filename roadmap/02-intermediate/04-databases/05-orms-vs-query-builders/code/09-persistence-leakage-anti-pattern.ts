import { logger } from "./shared/logger.js";

const antiPattern = {
  serviceCode: "orderService directly chains builder fragments and inspects ORM entity internals.",
  risks: [
    "Persistence-tool details leak through the service layer.",
    "Switching abstractions later becomes much harder.",
    "Testing business workflows now requires persistence-aware fixtures.",
  ],
};

logger.warn("Persistence leakage anti-pattern", {
  antiPattern,
  guidance: "The biggest enterprise problem is often not the choice of tool but the failure to keep the chosen abstraction behind clean repository boundaries.",
});
