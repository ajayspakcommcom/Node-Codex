const interviewQuestions: readonly string[] = [
  "Why do HTTP method semantics matter in API design?",
  "Why is returning the right status code important?",
  "What makes an API more RESTful?",
  "Why should validation happen at the HTTP boundary?",
  "Why are consistent response shapes important for clients?",
  "Why can unbounded list endpoints become a performance and contract problem?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
