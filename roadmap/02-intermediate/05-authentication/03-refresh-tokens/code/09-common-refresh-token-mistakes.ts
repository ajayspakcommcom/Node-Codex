import { logger } from "./shared/logger.js";

const mistakes = [
  "Using the same refresh token for too long without rotation.",
  "Failing to detect replay or reuse of an old rotated token.",
  "Assuming logout works without server-side invalidation.",
  "Treating refresh tokens as ordinary request credentials instead of high-sensitivity session credentials.",
  "Forgetting that refresh-token support usually reintroduces session state.",
];

logger.warn("Common refresh-token mistakes", {
  mistakes,
  guidance: "Refresh tokens are not just a convenience feature. They are a session-control mechanism that needs explicit lifecycle design and incident response behavior.",
});
