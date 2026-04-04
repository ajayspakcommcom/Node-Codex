const practiceExercises: readonly string[] = [
  "Replace an unbounded in-memory cache with a bounded cache and TTL strategy.",
  "Find and fix an event-listener leak in a sample component.",
  "Add cleanup for an interval created by a feature service.",
  "Compare a buffered large-payload implementation with a streamed one.",
  "Capture memory snapshots over time and reason about retained growth patterns.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
