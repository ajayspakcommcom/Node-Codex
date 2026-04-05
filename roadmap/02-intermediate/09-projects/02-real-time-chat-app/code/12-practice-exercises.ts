import { logger } from "./shared/logger.js";

logger.info("Practice exercises", {
  exercises: [
    "Add typing indicators as transient non persisted events.",
    "Add message edit and delete flows with moderator restrictions.",
    "Add per room unread counters for connected users.",
    "Add delivery acknowledgements per message instead of only a pending count.",
    "Add abuse reporting events and moderation audit history.",
  ],
});
