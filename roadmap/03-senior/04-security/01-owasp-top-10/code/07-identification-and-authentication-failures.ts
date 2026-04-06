import { randomUUID } from "node:crypto";
import { createLogger } from "./shared/logger";

const logger = createLogger("auth");

interface SessionToken {
  readonly tokenId: string;
  readonly userId: string;
  readonly expiresAt: string;
}

function issueSession(userId: string, ttlMinutes: number): SessionToken {
  return {
    tokenId: randomUUID(),
    userId,
    expiresAt: new Date(Date.now() + ttlMinutes * 60_000).toISOString(),
  };
}

logger.info("session_issued", {
  session: issueSession("usr_777", 15),
  note: "Short-lived sessions and explicit expiry reduce auth failure blast radius.",
});
