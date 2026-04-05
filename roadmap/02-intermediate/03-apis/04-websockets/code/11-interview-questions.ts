import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "When would you choose WebSockets over polling or server-sent events?",
  "Why should room joins and topic subscriptions have explicit authorization checks?",
  "What problems appear when you scale WebSocket connections across multiple instances?",
  "How would you handle slow consumers in a high fan-out real-time system?",
  "Which metrics would you inspect to understand whether a WebSocket system is healthy in production?",
];

logger.info("WebSockets interview questions", {
  interviewQuestions,
});
