const maintainabilityPatterns = [
  "Make queue, batch, and lag limits explicit in code.",
  "Treat dead-letter routing as an owned recovery path.",
  "Review schema evolution for replay compatibility, not just producer compatibility.",
  "Keep backpressure policy in one place instead of scattering thresholds.",
];

console.log(maintainabilityPatterns);
