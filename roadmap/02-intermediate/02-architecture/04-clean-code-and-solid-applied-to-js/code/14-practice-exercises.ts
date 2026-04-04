const practiceExercises: readonly string[] = [
  "Refactor a long controller method into smaller cohesive units.",
  "Replace direct infrastructure usage in business logic with an injected contract.",
  "Take duplicated mapping logic and move it into one clearer boundary.",
  "Review an overabstracted example and simplify it without losing behavior.",
  "Apply SRP to a service that currently owns unrelated responsibilities.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
