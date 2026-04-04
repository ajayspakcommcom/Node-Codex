const interviewQuestions: readonly string[] = [
  "What is the difference between operational and programmer errors?",
  "Why should backend APIs avoid exposing internal error details?",
  "Why is centralized error handling useful?",
  "How should async failures be handled differently from sync failures?",
  "Why are custom error classes useful in large systems?",
  "What should be logged when a request fails?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
