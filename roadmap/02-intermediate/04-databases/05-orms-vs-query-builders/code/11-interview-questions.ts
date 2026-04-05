import { logger } from "./shared/logger.js";

const interviewQuestions = [
  "Why might an ORM be a good fit for CRUD-heavy workflows but a poor fit for reporting-heavy ones?",
  "Why is generated query awareness still important when using a higher-level abstraction?",
  "How can repository boundaries reduce the risk of tool lock-in?",
  "When does a mixed ORM plus query-builder approach make sense in an enterprise codebase?",
  "What makes a persistence abstraction hard to test over time?",
];

logger.info("ORMs vs query builders interview questions", {
  interviewQuestions,
});
