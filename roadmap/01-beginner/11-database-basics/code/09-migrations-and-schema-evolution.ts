interface MigrationStep {
  readonly version: string;
  readonly description: string;
  readonly safeRolloutPlan: readonly string[];
}

const addUserStatusMigration: MigrationStep = {
  version: "2026_04_04_add_users_is_active",
  description: "Add users.isActive with default true and backfill historical rows.",
  safeRolloutPlan: [
    "Add the column in a forward-compatible migration.",
    "Backfill existing rows in batches.",
    "Deploy application code that reads the new field safely.",
    "Only then enforce stricter assumptions in the service layer.",
  ],
};

console.log(addUserStatusMigration);
console.log("Enterprise rule: schema changes must be versioned, reviewable, and repeatable.");
