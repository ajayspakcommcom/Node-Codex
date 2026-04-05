import { logger } from "./shared/logger.js";

const comparison = {
  shortSessionNoRefresh: {
    strengths: [
      "Simpler session lifecycle.",
      "Less long-lived credential exposure.",
    ],
    risks: [
      "More frequent reauthentication.",
    ],
  },
  refreshTokenBackedSession: {
    strengths: [
      "Better continuity for longer user sessions.",
      "Allows access tokens to stay short-lived.",
    ],
    risks: [
      "Adds rotation, replay detection, revocation, and storage complexity.",
    ],
  },
};

logger.info("Session continuity tradeoffs", {
  comparison,
  guidance: "Refresh tokens improve usability, but they also add server-side lifecycle complexity that teams should accept deliberately rather than by default.",
});
