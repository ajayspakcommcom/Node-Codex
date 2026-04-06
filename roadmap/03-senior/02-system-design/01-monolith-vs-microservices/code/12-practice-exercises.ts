import { logger } from "./shared/logger.js";

logger.section("Practice Exercises");
const exercises = [
  "Take an existing modular monolith and identify one extraction candidate with evidence for and against extraction.",
  "Map one user request across three hypothetical services and list the new latency and failure risks.",
  "Design a service boundary using domain ownership rather than technical layers.",
  "Explain when independent scaling is a real need versus an assumption.",
  "List three operational costs your team would pay if one module became a service tomorrow.",
];

for (const exercise of exercises) {
  logger.line(`- ${exercise}`);
}
