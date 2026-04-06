import { createLogger } from "./shared/logger";

const logger = createLogger("unsafe-query");

logger.info("bad_pattern", {
  query: "SELECT * FROM users WHERE email = '" + "user input" + "'",
  issue: "String concatenation places untrusted input inside executable query text.",
});

logger.info("better_pattern", {
  query: "SELECT * FROM users WHERE email = $1",
  issue: "Keep data as parameters instead of executable SQL fragments.",
});
