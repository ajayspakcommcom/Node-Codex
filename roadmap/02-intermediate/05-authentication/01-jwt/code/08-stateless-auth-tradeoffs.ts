import { logger } from "./shared/logger.js";

const tradeoffComparison = {
  statelessJwtAuth: {
    strengths: [
      "Can reduce session-store lookups on each request.",
      "Works well for distributed identity propagation when verification rules are consistent.",
    ],
    risks: [
      "Harder to revoke immediately.",
      "Requires careful token lifetime and key-management strategy.",
    ],
  },
  serverTrackedSessionAuth: {
    strengths: [
      "Immediate revocation and tighter session control are easier.",
      "Authorization changes can take effect more quickly if the session is re-evaluated centrally.",
    ],
    risks: [
      "Requires shared session infrastructure.",
      "Can add more server-side operational complexity.",
    ],
  },
};

logger.info("Stateless auth tradeoffs", {
  tradeoffComparison,
  guidance: "JWT-based stateless auth is a systems-design tradeoff, not an automatic upgrade over every server-side session design.",
});
