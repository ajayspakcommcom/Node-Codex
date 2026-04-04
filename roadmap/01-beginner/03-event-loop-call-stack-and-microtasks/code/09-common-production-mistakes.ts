function assumeTimerIsImmediate(): void {
  setTimeout(() => {
    console.log("Timer callback eventually ran");
  }, 0);

  console.log("Bad assumption: timer has not run yet");
}

function recursiveMicrotasks(limit: number): void {
  let count = 0;

  function schedule(): void {
    if (count >= limit) {
      return;
    }

    count += 1;
    Promise.resolve().then(schedule);
  }

  schedule();
}

assumeTimerIsImmediate();
recursiveMicrotasks(5);
console.log("Scheduled recursive microtasks");
