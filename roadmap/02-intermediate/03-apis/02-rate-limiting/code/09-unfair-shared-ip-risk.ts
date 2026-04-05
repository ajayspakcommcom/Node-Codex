import { logger } from "./shared/logger.js";

const officeNetworkScenario = {
  officeName: "Regional support center",
  apparentIpAddress: "203.0.113.200",
  realUsersBehindIp: 120,
  risk: "A strict per-IP limit could throttle many legitimate authenticated users together.",
};

const saferEnterpriseApproach = {
  authenticatedTrafficKey: "user or tenant",
  anonymousTrafficKey: "ip",
  rationale: "Use the identity that matches fairness for the route instead of treating all shared networks as one client.",
};

logger.warn("Unfair shared-IP throttling risk", {
  officeNetworkScenario,
  saferEnterpriseApproach,
  guidance: "IP-only throttling is often too blunt for authenticated enterprise APIs because many legitimate users may share one visible network address.",
});
