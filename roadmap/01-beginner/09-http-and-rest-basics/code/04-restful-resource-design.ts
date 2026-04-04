const resourceOrientedRoutes = [
  "GET /users",
  "GET /users/:id",
  "POST /users",
  "GET /orders/:id",
  "POST /orders/:id/payments",
  "GET /orders/:id/payments",
];

const actionHeavyRoutes = [
  "POST /createUser",
  "POST /getOrderDetails",
  "POST /payOrderNow",
];

console.log("Resource-oriented REST design:");
for (const route of resourceOrientedRoutes) {
  console.log(`- ${route}`);
}

console.log("Action-heavy patterns that are harder to keep consistent:");
for (const route of actionHeavyRoutes) {
  console.log(`- ${route}`);
}
