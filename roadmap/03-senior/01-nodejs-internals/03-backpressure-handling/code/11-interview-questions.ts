import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why is an unbounded queue a dangerous overload strategy?",
    "What problem does load shedding solve?",
    "Why can slow consumers degrade everyone else in a real time system?",
    "How do retries make backpressure worse when designed poorly?",
    "Why should backpressure be reasoned about across multiple boundaries instead of one queue only?",
  ],
});
