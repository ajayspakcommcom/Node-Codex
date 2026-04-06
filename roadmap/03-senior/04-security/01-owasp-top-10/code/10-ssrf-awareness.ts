import { URL } from "node:url";
import { createLogger } from "./shared/logger";

const logger = createLogger("ssrf");

const allowedHosts = new Set(["api.partner.example"]);

function assertSafeOutboundUrl(rawUrl: string): URL {
  const parsed = new URL(rawUrl);

  if (!allowedHosts.has(parsed.hostname)) {
    throw new Error("Outbound destination is not approved");
  }

  return parsed;
}

const safeUrl = assertSafeOutboundUrl("https://api.partner.example/orders");

logger.info("outbound_request_allowed", {
  host: safeUrl.hostname,
  note: "Outbound calls should be validated against an allowlist, not accepted from arbitrary user input.",
});
