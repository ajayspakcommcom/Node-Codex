import { logger } from "./shared/logger.js";

const mistakes = [
  "Choosing a flow by popularity instead of trust boundary fit.",
  "Granting more scopes than the client truly needs.",
  "Treating OAuth2 as if it automatically solves all identity concerns.",
  "Allowing overly broad redirect URI matching.",
  "Using long-lived tokens with no clear compromise-response strategy.",
  "Blurring user-delegated and machine-to-machine access patterns.",
];

logger.warn("Common OAuth2 mistakes", {
  mistakes,
  guidance: "OAuth2 should be treated as a delegated-authorization model with explicit actors, scopes, and boundaries, not as copy-paste middleware configuration.",
});
