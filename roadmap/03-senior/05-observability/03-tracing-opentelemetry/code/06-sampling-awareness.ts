console.log(
  JSON.stringify({
    strategy: "sample 1 out of N normal traces and always keep errors or high-latency traces",
    reason: "Tracing cost and storage must stay bounded while preserving incident usefulness.",
  }),
);
