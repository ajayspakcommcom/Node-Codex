const interviewQuestions: readonly string[] = [
  "Why should controllers stay thin in backend services?",
  "What is middleware best used for in Express?",
  "Why should validation happen at the request boundary?",
  "Why is centralized error middleware useful?",
  "What is the difference between controller and service responsibilities?",
  "When is feature-based structure better than a global MVC folder split?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
