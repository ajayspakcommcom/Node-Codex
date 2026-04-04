const interviewQuestions: readonly string[] = [
  "Why can garbage collection fail to solve a memory leak in Node.js?",
  "What is the difference between temporary memory spikes and retained memory growth?",
  "Why are unbounded caches dangerous in long-running services?",
  "How can event listeners and intervals contribute to memory problems?",
  "Why is streaming often safer than buffering for large payloads?",
  "What can process.memoryUsage() tell you during diagnostics?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
