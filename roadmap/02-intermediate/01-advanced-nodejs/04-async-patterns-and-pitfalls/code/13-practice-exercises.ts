const practiceExercises: readonly string[] = [
  "Refactor an async forEach workflow into a sequential or controlled-concurrency loop.",
  "Add timeout handling to an external service call and make cancellation explicit.",
  "Wrap a transient dependency call with bounded retries.",
  "Compare Promise.all and Promise.allSettled for a batch import workflow.",
  "Simulate a race condition with shared state and redesign the flow to avoid it.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
