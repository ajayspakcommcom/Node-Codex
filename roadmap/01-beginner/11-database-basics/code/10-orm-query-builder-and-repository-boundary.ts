type StorageEngine = "sql-with-query-builder" | "document-store-driver";

interface UserRepository {
  findActiveUserEmails(): readonly string[];
}

class SqlUserRepository implements UserRepository {
  public findActiveUserEmails(): readonly string[] {
    return ["ajay@example.com", "ops@example.com"];
  }
}

class DocumentUserRepository implements UserRepository {
  public findActiveUserEmails(): readonly string[] {
    return ["ajay@example.com", "ops@example.com"];
  }
}

function buildRepository(storageEngine: StorageEngine): UserRepository {
  return storageEngine === "sql-with-query-builder"
    ? new SqlUserRepository()
    : new DocumentUserRepository();
}

console.log(buildRepository("sql-with-query-builder").findActiveUserEmails());
console.log("Enterprise rule: services should depend on repository contracts, not ORM-specific details.");
