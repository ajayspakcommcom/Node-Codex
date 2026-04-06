import { createLogger } from "./shared/logger";

const logger = createLogger("injection");

interface QuerySpec {
  readonly text: string;
  readonly values: readonly string[];
}

function buildUserLookupQuery(email: string): QuerySpec {
  return {
    text: "SELECT user_id, email FROM users WHERE email = $1",
    values: [email],
  };
}

const query = buildUserLookupQuery("team@example.com");

logger.info("parameterized_query", {
  query: query.text,
  parameterCount: query.values.length,
  note: "Parameterized queries keep untrusted input out of executable SQL text.",
});
