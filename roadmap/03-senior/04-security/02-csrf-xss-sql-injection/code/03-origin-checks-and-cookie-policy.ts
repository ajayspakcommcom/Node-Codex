import { createLogger } from "./shared/logger";

const logger = createLogger("origin-policy");

interface BrowserSecurityPolicy {
  readonly allowedOrigins: readonly string[];
  readonly sameSite: "strict" | "lax" | "none";
  readonly secureCookies: boolean;
}

const policy: BrowserSecurityPolicy = {
  allowedOrigins: ["https://app.example.com"],
  sameSite: "lax",
  secureCookies: true,
};

logger.info("browser_policy", {
  policy,
  note: "CSRF protection is stronger when cookie and origin policy are explicit.",
});
