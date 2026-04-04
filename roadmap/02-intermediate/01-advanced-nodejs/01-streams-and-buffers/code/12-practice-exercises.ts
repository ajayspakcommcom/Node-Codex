const practiceExercises: readonly string[] = [
  "Stream a large file to an HTTP response instead of using readFile.",
  "Create a transform stream that sanitizes or prefixes log lines.",
  "Implement a pipeline that reads, transforms, and writes a file with centralized error handling.",
  "Simulate a slow writable stream and observe backpressure with drain handling.",
  "Compare a buffered export approach with a streamed export approach and explain the memory tradeoffs.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
