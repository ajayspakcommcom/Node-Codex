const interviewQuestions: readonly string[] = [
  "Why does blocking JavaScript work hurt all concurrent requests in Node.js?",
  "Why can promise callbacks run before setTimeout callbacks?",
  "When is process.nextTick dangerous?",
  "Why does async I/O not guarantee a fast request handler?",
  "What does backpressure mean in a backend service?",
  "Why should CPU-heavy work be moved out of the request path?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
