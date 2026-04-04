const interviewQuestions: readonly string[] = [
  "What is the difference between a buffer and a stream in Node.js?",
  "Why is streaming safer than reading a large file fully into memory?",
  "What problem does backpressure solve?",
  "What is the purpose of pipeline in Node.js stream handling?",
  "When would you use a transform stream in a backend service?",
  "What effect can highWaterMark have on memory and throughput behavior?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
