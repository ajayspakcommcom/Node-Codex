import { failure, ok } from "./shared/response-helpers.js";

console.log(
  "Consistent success response:",
  ok(
    {
      id: "usr_100",
      email: "consistent@example.com",
    },
    {
      requestId: "req_333",
    },
  ),
);

console.log("Consistent error response:", failure(403, "FORBIDDEN", "actor is not allowed to access this resource"));
