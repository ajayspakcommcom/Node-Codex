const practiceExercises: readonly string[] = [
  "Refactor a fat controller into controller, service, and repository layers.",
  "Map a persistence model into a DTO before returning it from an API boundary.",
  "Move direct database logic out of a controller and into a repository.",
  "Document dependency rules for a layered Node.js module.",
  "Review a codebase and identify where layering is too weak or too rigid.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
