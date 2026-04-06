import { SimpleTracer } from "./shared/tracer";

const tracer = new SimpleTracer("orders-api");

const rootSpan = tracer.startSpan("http.request");
rootSpan.end();

console.log(JSON.stringify(rootSpan.toJSON()));
