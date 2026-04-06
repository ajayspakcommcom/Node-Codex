import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("inventory-api");
const span = tracer.startSpan("inventory.reserve");

const traceContextHeader = `00-${span.traceId}-${span.spanId}-01`;

console.log(
  JSON.stringify({
    traceparent: traceContextHeader,
    note: "Services should propagate trace context across boundaries instead of inventing unrelated identifiers.",
  }),
);
