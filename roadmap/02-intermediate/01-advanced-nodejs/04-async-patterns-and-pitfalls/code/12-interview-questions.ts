const interviewQuestions: readonly string[] = [
  "Why is forEach dangerous with async callbacks?",
  "When should you use Promise.all instead of Promise.allSettled?",
  "Why is uncontrolled concurrency risky in backend services?",
  "What is the difference between timeout and cancellation?",
  "Why can retries be unsafe without idempotency?",
  "Why is fire-and-forget work risky in production systems?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
