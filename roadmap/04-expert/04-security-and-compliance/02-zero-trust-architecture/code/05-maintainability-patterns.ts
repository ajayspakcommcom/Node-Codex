export const maintainabilityPatterns = [
  "Keep identity and authorization policy explicit instead of inferring trust from networks.",
  "Prefer short-lived credentials and treat long-lived credentials as exceptions.",
  "Review access decisions in code and tests, not only in runtime consoles.",
  "Keep policy ownership clear as services and identities grow.",
] as const;
