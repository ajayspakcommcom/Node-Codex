import { logger } from "./shared/logger.js";

const keyExamples = {
  anonymousPublicEndpoint: {
    fairnessKey: "ip",
    example: "public-api:ip:203.0.113.5",
  },
  authenticatedBusinessApi: {
    fairnessKey: "user",
    example: "authenticated-api:user:user_42",
  },
  multiTenantReportApi: {
    fairnessKey: "tenant",
    example: "report-generation:tenant:tenant_enterprise",
  },
  partnerIntegration: {
    fairnessKey: "client",
    example: "partner-sync:client:partner-crm",
  },
};

logger.info("Per-identity rate-limit keys", {
  keyExamples,
  guidance: "The limiter key should reflect the real fairness boundary of the workflow rather than defaulting to IP address for every route.",
});
