const practiceExercises: readonly string[] = [
  "Move a synchronous CPU-heavy function into a worker thread.",
  "Add timeout and termination logic around a worker job.",
  "Build a message-based worker contract for a reporting task.",
  "Demonstrate the difference between process scaling with cluster and compute offloading with worker_threads.",
  "Refactor worker creation into a dedicated gateway or service class.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
