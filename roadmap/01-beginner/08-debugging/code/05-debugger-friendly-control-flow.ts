interface PaymentAttempt {
  readonly paymentId: string;
  readonly amount: number;
  readonly isFraudCheckEnabled: boolean;
}

function processPayment(attempt: PaymentAttempt): "accepted" | "blocked" {
  const decisionContext = {
    ...attempt,
    threshold: 1000,
  };

  debugger;

  if (decisionContext.isFraudCheckEnabled && decisionContext.amount > decisionContext.threshold) {
    return "blocked";
  }

  return "accepted";
}

console.log(
  processPayment({
    paymentId: "pay_100",
    amount: 1200,
    isFraudCheckEnabled: true,
  }),
);
