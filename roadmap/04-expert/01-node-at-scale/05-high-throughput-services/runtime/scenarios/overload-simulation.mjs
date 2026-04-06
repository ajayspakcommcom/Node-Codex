import { TokenBucketLimiter } from "../shared/token-bucket.mjs";
import { ConcurrencyLimiter } from "../shared/concurrency-limiter.mjs";

const limiter = new TokenBucketLimiter(200, 20);
const dependencyLimiter = new ConcurrencyLimiter(50);

let accepted = 0;
let rejected = 0;
let dependencyRejected = 0;

const tasks = [];

for (let index = 0; index < 500; index += 1) {
  const admissionAccepted = limiter.tryConsume("tenant-a", 1, 1_000 + index);

  if (!admissionAccepted) {
    rejected += 1;
    continue;
  }

  accepted += 1;
  tasks.push(
    dependencyLimiter.run(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2));
      return true;
    }).catch(() => {
      dependencyRejected += 1;
      return false;
    }),
  );
}

await Promise.all(tasks);

console.log(
  JSON.stringify({
    scenario: "overload-simulation",
    accepted,
    rejected,
    dependencyRejected,
  }),
);
