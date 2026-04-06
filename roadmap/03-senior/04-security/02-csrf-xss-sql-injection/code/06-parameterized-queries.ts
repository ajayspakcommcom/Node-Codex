import { createLogger } from "./shared/logger";

const logger = createLogger("parameterized-query");

interface QuerySpec {
  readonly text: string;
  readonly values: readonly string[];
}

function buildAccountLookupQuery(accountId: string): QuerySpec {
  return {
    text: "SELECT account_id, status FROM accounts WHERE account_id = $1",
    values: [accountId],
  };
}

const query = buildAccountLookupQuery("acc_900");

logger.info("safe_query", {
  query: query.text,
  parameterCount: query.values.length,
});
