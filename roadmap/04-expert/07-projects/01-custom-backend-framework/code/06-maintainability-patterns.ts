export const maintainabilityPatterns = [
  "Keep platform defaults explicit so service teams can reason about runtime behavior.",
  "Require compatibility review before framework upgrades reach adopters.",
  "Allow extension hooks without letting services bypass mandatory controls.",
  "Treat framework releases as product releases with changelog and migration discipline.",
] as const;
