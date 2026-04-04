import { created, failure, ok } from "./shared/response-helpers.js";

console.log("200 success:", ok({ orderId: "ord_1", status: "paid" }));
console.log("201 created:", created({ orderId: "ord_2", status: "created" }));
console.log("400 validation failure:", failure(400, "VALIDATION_ERROR", "email is required"));
console.log("404 missing resource:", failure(404, "NOT_FOUND", "order not found"));
console.log("409 business conflict:", failure(409, "ORDER_ALREADY_PAID", "order is already paid"));
console.log("500 internal failure:", failure(500, "INTERNAL_SERVER_ERROR", "unexpected server failure"));
