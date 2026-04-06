import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("checkout-api");

const requestSpan = tracer.startSpan("checkout.request");
const pricingSpan = tracer.startSpan("pricing.lookup", requestSpan);
pricingSpan.end();
requestSpan.end();

console.log(
  JSON.stringify({
    requestSpan: requestSpan.toJSON(),
    pricingSpan: pricingSpan.toJSON(),
  }),
);
