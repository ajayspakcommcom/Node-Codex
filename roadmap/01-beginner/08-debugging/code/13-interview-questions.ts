const interviewQuestions: readonly string[] = [
  "What is the difference between a symptom and a root cause?",
  "Why are stack traces valuable during backend debugging?",
  "Why is structured logging better than random console logging?",
  "Why do request IDs matter during debugging?",
  "What makes async debugging harder than sync debugging?",
  "Why is reproducibility important before fixing a bug?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
