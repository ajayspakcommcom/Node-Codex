console.log(
  JSON.stringify({
    alertName: "payments_high_failure_rate",
    severity: "sev2",
    owner: "payments-team",
    escalationPath: ["oncall-payments", "incident-manager", "platform-oncall"],
  }),
);
