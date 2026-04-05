import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why should room authorization happen before joining a socket room?",
    "What is the difference between message transport and message persistence in a chat system?",
    "Why can reconnect handling not rely only on the client?",
    "What problem does cross instance pub sub solve in a real time application?",
    "Why should slow consumer handling be explicit in a chat gateway?",
  ],
});
