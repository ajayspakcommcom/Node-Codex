export const maintainabilityPatterns = [
  "Keep rollout policy in code-reviewable modules instead of tribal knowledge.",
  "Separate expand, migrate, shift, drain, and contract into distinct release steps.",
  "Require compatibility overlap before promoting traffic to a new version.",
  "Model worker and API compatibility in the same deployment plan.",
] as const;
