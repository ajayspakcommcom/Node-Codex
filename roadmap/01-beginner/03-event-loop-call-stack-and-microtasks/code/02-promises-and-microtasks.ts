console.log("1. sync start");

Promise.resolve()
  .then(() => {
    console.log("3. promise microtask");
  })
  .then(() => {
    console.log("4. chained microtask");
  });

setTimeout(() => {
  console.log("5. timer callback");
}, 0);

console.log("2. sync end");
