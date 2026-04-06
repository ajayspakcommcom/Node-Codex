export const maintainabilityPatterns = [
  "Keep authorization policy separate from traffic policy so review stays clear.",
  "Do not let mesh retries duplicate application retries without coordination.",
  "Roll out mesh routing changes gradually with explicit rollback weights.",
  "Treat mesh policy as code with owners, tests, and incident visibility.",
] as const;
