import { nowMs } from "./shared/timing.js";

function blockFor(ms: number): void {
  const start = nowMs();

  while (nowMs() - start < ms) {
    // Intentionally busy to demonstrate event-loop blocking.
  }
}

const timerScheduledAt = nowMs();

setTimeout(() => {
  const actualDelay = nowMs() - timerScheduledAt;
  console.log("Timer executed after delay:", actualDelay);
}, 0);

console.log("Blocking the event loop for 150ms...");
blockFor(150);
console.log("Blocking completed");
