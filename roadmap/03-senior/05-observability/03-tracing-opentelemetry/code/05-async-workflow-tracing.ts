import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("notification-worker");

const producerSpan = tracer.startSpan("email.dispatch.request");
const consumerSpan = tracer.startSpan("queue.consume.email", producerSpan, {
  "messaging.system": "queue",
  "messaging.destination": "email-delivery",
});

consumerSpan.end();
producerSpan.end();

console.log(
  JSON.stringify({
    producerSpan: producerSpan.toJSON(),
    consumerSpan: consumerSpan.toJSON(),
  }),
);
