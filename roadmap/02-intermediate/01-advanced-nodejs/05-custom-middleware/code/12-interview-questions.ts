const interviewQuestions: readonly string[] = [
  "What responsibilities belong in middleware and what should stay in services?",
  "Why is middleware ordering important in Express-style applications?",
  "Why should request-correlation middleware run early in the request flow?",
  "What risks come from hiding business logic in middleware?",
  "How should async middleware propagate errors?",
  "Why should authentication and authorization middleware stay explicit?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
