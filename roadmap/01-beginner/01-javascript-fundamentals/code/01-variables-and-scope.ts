type RetrySummary = {
  serviceName: string;
  attempts: number;
  exceededThreshold: boolean;
};

function buildRetrySummary(maxRetries: number): RetrySummary {
  const serviceName = "billing-sync";
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts += 1;
  }

  return {
    serviceName,
    attempts,
    exceededThreshold: attempts > 2,
  };
}

function createStatusMessage(jobName: string, isHealthy: boolean): string {
  const status = isHealthy ? "healthy" : "degraded";
  return `${jobName} is ${status}`;
}

const summary = buildRetrySummary(3);

console.log("Retry summary:", summary);
console.log(createStatusMessage("user-cache-refresh", true));
