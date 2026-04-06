import { createLogger } from "./shared/logger";

const logger = createLogger("least-privilege");

interface WorkloadAccessPolicy {
  readonly workload: string;
  readonly allowedSecrets: readonly string[];
}

const policy: WorkloadAccessPolicy = {
  workload: "billing-api",
  allowedSecrets: ["billing/db/password", "billing/jwt/private-key"],
};

logger.info("workload_secret_policy", {
  policy,
  note: "Each workload should only be able to fetch the secrets it actually needs.",
});
