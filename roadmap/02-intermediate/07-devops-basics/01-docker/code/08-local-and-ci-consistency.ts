import { logger } from "./shared/logger.js";
import { enterpriseApiSpec } from "./shared/docker-runtime.js";

logger.info("Local and CI consistency", {
  project: enterpriseApiSpec.projectName,
  benefits: [
    "same Dockerfile can validate startup assumptions across developer laptops and CI",
    "layer ordering helps CI build speed and local rebuild speed stay aligned",
    "runtime config stays explicit instead of relying on undocumented local setup",
  ],
});
