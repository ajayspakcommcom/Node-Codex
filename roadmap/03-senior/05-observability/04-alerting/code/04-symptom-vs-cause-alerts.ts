console.log(
  JSON.stringify({
    symptomAlert: "checkout p95 latency above SLO threshold",
    causeAlert: "postgres primary CPU saturation above threshold",
    note: "Symptom alerts often page first; cause alerts help responders investigate faster.",
  }),
);
