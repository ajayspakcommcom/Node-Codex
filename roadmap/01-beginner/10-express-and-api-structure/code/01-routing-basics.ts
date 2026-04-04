const routes = [
  "GET /orders",
  "GET /orders/:id",
  "POST /orders",
  "PATCH /orders/:id",
];

console.log("Express routing basics:");
for (const route of routes) {
  console.log(`- ${route}`);
}
