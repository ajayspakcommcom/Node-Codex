const interviewQuestions: readonly string[] = [
  "What is the difference between relational and non-relational databases?",
  "Why are primary keys and foreign keys important?",
  "When would you add an index and what tradeoff does it introduce?",
  "Why should list endpoints use pagination?",
  "What is the purpose of a transaction?",
  "Why should services not depend directly on ORM internals?",
  "Why should database models not be returned directly to API clients?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
