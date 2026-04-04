const interviewQuestions: readonly string[] = [
  "Why should production code prefer const by default?",
  "When is ?? safer than ||?",
  "Why can optional chaining hide weak validation?",
  "When should a long inline arrow function be refactored into a named helper?",
  "What risks come from using spread as if it were a deep clone?",
  "Why do enterprise teams care about minimal exports?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
