import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why should authentication and authorization be separate concerns in an auth service?",
    "What problem does refresh token rotation solve?",
    "How does logout work when access tokens are stateless?",
    "Why should tenant boundaries be enforced in the backend even if the UI hides cross-tenant actions?",
    "What kinds of events should an auth service write to an audit log?",
  ],
});
