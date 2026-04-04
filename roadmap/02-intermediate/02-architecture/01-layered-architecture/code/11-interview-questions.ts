const interviewQuestions: readonly string[] = [
  "What problem does layered architecture solve in backend systems?",
  "Why should controllers stay thin?",
  "What belongs in a service layer vs a repository layer?",
  "Why is dependency direction important in layered architecture?",
  "Why should infrastructure details stay behind explicit boundaries?",
  "When can layering become overengineered?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
