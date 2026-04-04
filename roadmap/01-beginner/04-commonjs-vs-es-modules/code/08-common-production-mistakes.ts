const moduleMistakes: readonly string[] = [
  "Mixing require and import without understanding runtime configuration",
  "Importing private internal files instead of a public module entrypoint",
  "Using default exports and named exports inconsistently across a package",
  "Migrating syntax without updating package and compiler configuration",
  "Creating circular dependencies between feature modules",
];

for (const mistake of moduleMistakes) {
  console.log(`- ${mistake}`);
}
