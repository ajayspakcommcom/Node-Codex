const mistakes: readonly string[] = [
  "Running raw queries inside controllers",
  "Returning database rows directly in API responses",
  "Skipping indexes on high-volume filter fields",
  "Allowing unbounded list queries",
  "Ignoring transaction boundaries for multi-step writes",
  "Depending only on application checks instead of database constraints",
  "Creating N+1 query patterns",
  "Changing schemas manually instead of using migrations",
];

for (const mistake of mistakes) {
  console.log(`Production mistake: ${mistake}`);
}

console.log("Enterprise rule: treat data access as a first-class design concern.");
