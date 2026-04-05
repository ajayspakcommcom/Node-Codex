import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why is OAuth2 better described as delegated authorization rather than as a generic authentication solution?",
  "How do scopes reduce risk in an OAuth2 design?",
  "Why is redirect URI validation security-critical in the authorization code pattern?",
  "When is client credentials a better fit than user-delegated access?",
  "Why should a team define the actors and trust boundary before choosing an OAuth2 flow?",
];

logger.info("OAuth2 interview questions", {
  interviewQuestions,
});
