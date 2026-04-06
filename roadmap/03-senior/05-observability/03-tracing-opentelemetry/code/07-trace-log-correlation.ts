import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("auth-api");
const span = tracer.startSpan("login.request");

console.log(
  JSON.stringify({
    eventName: "identity-provider-call-started",
    traceId: span.traceId,
    spanId: span.spanId,
    message: "trace identifiers should also appear in logs for incident correlation",
  }),
);

span.end();
