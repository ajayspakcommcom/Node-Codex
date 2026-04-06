import { createHash } from "node:crypto";
import { createLogger } from "./shared/logger";

const logger = createLogger("integrity");

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

const artifactHash = sha256("release-artifact-v1");

logger.info("artifact_integrity", {
  artifactHash,
  note: "Build and release workflows should verify artifact integrity instead of trusting every step implicitly.",
});
