import { logger } from "./shared/logger.js";

logger.info("CI/CD interview prompts", {
  questions: [
    "Why should CI pipelines separate validation from deployment concerns?",
    "What makes a quality gate meaningful in GitHub Actions?",
    "Why is artifact creation important even when tests pass?",
    "How should secrets be handled in a pipeline?",
    "What risks come from broad or wildcard workflow triggers?",
  ],
});
