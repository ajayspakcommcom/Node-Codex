const practiceExercises: readonly string[] = [
  "Build request-id middleware and attach it to request logging.",
  "Write validation middleware for required body fields and params.",
  "Implement authentication middleware that enriches the request safely.",
  "Create async middleware and route its errors into a centralized error boundary.",
  "Refactor middleware that contains business logic into a service-layer flow.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
