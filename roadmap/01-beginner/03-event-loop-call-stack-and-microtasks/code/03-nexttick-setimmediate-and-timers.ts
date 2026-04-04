import { scheduleImmediate, scheduleNextTick } from "./shared/runtime.js";

console.log("1. sync start");

scheduleNextTick(() => {
  console.log("3. process.nextTick callback");
});

Promise.resolve().then(() => {
  console.log("4. promise microtask");
});

setTimeout(() => {
  console.log("6. setTimeout callback");
}, 0);

scheduleImmediate(() => {
  console.log("5. setImmediate callback");
});

console.log("2. sync end");
