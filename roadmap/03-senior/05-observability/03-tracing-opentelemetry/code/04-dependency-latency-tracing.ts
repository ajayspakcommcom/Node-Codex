import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("billing-api");

const requestSpan = tracer.startSpan("create-invoice");
const dependencySpan = tracer.startSpan("postgres.insert", requestSpan, {
  "db.system": "postgresql",
  "db.operation": "insert",
});

dependencySpan.end();
requestSpan.end();

console.log(JSON.stringify(dependencySpan.toJSON()));
