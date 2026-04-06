import { createLogger } from "./shared/logger";

const logger = createLogger("beyond-sql");

logger.info("nosql_injection_awareness", {
  issue: "Dynamic query objects built from raw request payloads can still become injection boundaries.",
});

logger.info("shell_injection_awareness", {
  issue: "Concatenating user input into shell commands creates remote command execution risk.",
});

logger.info("template_injection_awareness", {
  issue: "Rendering untrusted template expressions can become code execution or XSS.",
});
