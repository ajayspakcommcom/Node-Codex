type RequestLogger = (route: string, method: string, requestId: string) => string;

type RateLimiter = {
  canProceed(): boolean;
  getCount(): number;
};

function createRequestLogger(serviceName: string): RequestLogger {
  return function logRequest(route: string, method: string, requestId: string): string {
    return `[${serviceName}] ${method} ${route} requestId=${requestId}`;
  };
}

function createRateLimiter(limit: number): RateLimiter {
  let count = 0;

  return {
    canProceed() {
      count += 1;
      return count <= limit;
    },
    getCount() {
      return count;
    },
  };
}

const logPaymentsRequest = createRequestLogger("payments-service");
const rateLimiter = createRateLimiter(3);

console.log(logPaymentsRequest("/payments", "POST", "req_001"));
console.log(rateLimiter.canProceed());
console.log(rateLimiter.canProceed());
console.log(rateLimiter.canProceed());
console.log(rateLimiter.canProceed());
console.log("Final count:", rateLimiter.getCount());
