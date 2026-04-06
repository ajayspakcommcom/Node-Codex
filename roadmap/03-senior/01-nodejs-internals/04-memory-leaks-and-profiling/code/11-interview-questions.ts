import { logger } from "./shared/logger.js";

logger.info("Interview questions", {
  questions: [
    "Why is retained reachability more important than allocation count when debugging leaks?",
    "How can an unbounded cache create both memory and latency problems?",
    "Why is restarting a leaky process not a real fix?",
    "How do listener buildup and closure retention create long lived memory growth?",
    "Why should profiling happen before claiming a leak source?",
  ],
});
