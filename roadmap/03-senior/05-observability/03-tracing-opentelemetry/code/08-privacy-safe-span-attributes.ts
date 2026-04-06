import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("payments-api");
const span = tracer.startSpan("charge-card", undefined, {
  "payment.provider": "stripe",
  "payment.result": "approved",
  "customer.segment": "enterprise",
});

span.end();

console.log(
  JSON.stringify({
    span: span.toJSON(),
    note: "Span attributes should be useful but must avoid raw tokens, card data, or sensitive payloads.",
  }),
);
