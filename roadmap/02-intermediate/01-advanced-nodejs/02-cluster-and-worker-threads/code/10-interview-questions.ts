const interviewQuestions: readonly string[] = [
  "Why is CPU-bound work dangerous in a Node.js request handler?",
  "What problem does worker_threads solve?",
  "What problem does cluster solve?",
  "When would you choose cluster instead of a worker thread?",
  "Why does message payload size matter in worker communication?",
  "Why should worker timeouts and termination strategy be explicit?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
