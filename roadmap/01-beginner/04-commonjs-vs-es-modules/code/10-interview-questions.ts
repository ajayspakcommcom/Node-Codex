const interviewQuestions: readonly string[] = [
  "Why do large Node.js codebases care about module system consistency?",
  "What practical problems appear when CommonJS and ES Modules are mixed carelessly?",
  "Why do many enterprise teams prefer named exports?",
  "Why is a public module entrypoint better than importing internal files directly?",
  "Why is migration from CommonJS to ES Modules more than a syntax change?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
