import { logger } from "./shared/logger.js";

logger.info("Practice exercises for unit testing with Jest", {
  exercises: [
    "Add tests for invalid coupon handling in PricingService.",
    "Extend AccessPolicyService with edit permissions and test tenant boundaries.",
    "Add a retry counter to SubscriptionRenewalService and test the failure policy.",
    "Refactor a test to replace brittle call-count assertions with outcome-focused assertions.",
    "Add a fake email gateway and verify reminder dispatch behavior without using real infrastructure.",
  ],
});
