const interviewQuestions: string[] = [
  "Why is const preferred in production code?",
  "What is the difference between primitive and reference types?",
  "How do closures help and hurt maintainability?",
  "Why is strict equality safer than loose equality in backend systems?",
  "What problems can happen if you mutate shared objects?",
  "When is optional chaining useful, and when can it hide design problems?",
  "Why do enterprise teams care about scope and variable lifetime?",
  "How does JavaScript function context affect method behavior?",
];

for (const question of interviewQuestions) {
  console.log(`- ${question}`);
}
