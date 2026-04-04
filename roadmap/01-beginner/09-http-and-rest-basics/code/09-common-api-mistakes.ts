console.log("Bad API patterns:");
console.log("- POST /getUserDetails returning 200 for every outcome");
console.log("- 200 response for validation failure");
console.log("- Returning different JSON shapes from similar endpoints");
console.log("- Parsing query/body directly inside deep business logic");
console.log("- Returning a huge unbounded list without pagination");

console.log("Corrected API patterns:");
console.log("- GET /users/:id for resource retrieval");
console.log("- 400 for invalid input, 404 for missing resource, 409 for business conflict");
console.log("- Consistent { data } and { error } response shapes");
console.log("- Validation at the HTTP boundary");
console.log("- Explicit pagination, filtering, and sorting parameters");
