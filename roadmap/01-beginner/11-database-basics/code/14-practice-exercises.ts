const practiceExercises: readonly string[] = [
  "Design users, orders, and order_items tables with explicit keys and constraints.",
  "Add indexes for a product search API and explain the reasoning.",
  "Write a repository method for paginated product listing with approved filters.",
  "Model a transaction that creates an order and reserves inventory safely.",
  "Refactor a controller that queries the database directly into repository and service layers.",
  "Map a persistence model into a client-safe DTO.",
];

for (const exercise of practiceExercises) {
  console.log(exercise);
}
