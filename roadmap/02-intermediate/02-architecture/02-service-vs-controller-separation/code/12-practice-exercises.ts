const practiceExercises: readonly string[] = [
  "Refactor a fat controller into a thin controller and a service.",
  "Move direct database access out of a controller into a repository and service flow.",
  "Remove req/res usage from a service method and replace it with explicit input contracts.",
  "Review a service that contains unrelated responsibilities and split it into cohesive units.",
  "Map a service error into an HTTP response at the controller boundary.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
