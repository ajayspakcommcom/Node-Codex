const interviewQuestions: readonly string[] = [
  "What is the difference between controller and service responsibilities?",
  "Why should controllers stay thin in backend systems?",
  "Why should services avoid depending on HTTP request/response objects?",
  "What risks come from direct database access inside controllers?",
  "Why can a service layer also become poorly designed?",
  "How does controller/service separation improve testability?",
];

for (const question of interviewQuestions) {
  console.log(question);
}
