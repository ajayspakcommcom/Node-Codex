const runtimeMistakes: readonly string[] = [
  "Reading process.env everywhere instead of centralizing config",
  "Using blocking filesystem operations in request paths",
  "Hardcoding file paths instead of using path utilities",
  "Ignoring graceful shutdown during deployments",
  "Starting the service without validating required configuration",
  "Confusing runtime environment variables with build-time constants",
];

for (const mistake of runtimeMistakes) {
  console.log(`- ${mistake}`);
}
