const interviewQuestions: readonly string[] = [
  "Why should environment variables be validated at startup?",
  "Why is path safer than manual file-path string concatenation?",
  "What role does the process object play in a Node.js service?",
  "Why is graceful shutdown important during deployments?",
  "Why can filesystem operations be risky in hot request paths?",
  "What is the difference between runtime configuration and build-time configuration?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
