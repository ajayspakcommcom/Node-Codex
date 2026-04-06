# Tracing (OpenTelemetry)

## Purpose

Tracing shows how a request or workflow moves across services, queues, and dependencies, making latency sources and failure propagation visible in distributed systems.

## Enterprise-Level Pointers

- what distributed tracing is and why it matters
- traces, spans, and context propagation
- parent-child span relationships
- W3C trace context awareness
- OpenTelemetry as a cross-vendor instrumentation standard
- tracing synchronous requests and asynchronous workflows
- span attributes and event design
- propagating trace context across HTTP, messaging, and background jobs
- sampling strategy awareness
- connecting traces to logs and metrics
- tracing dependency latency and downstream failures
- tracing cost and cardinality awareness
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- fast root-cause identification across distributed request flows
- visibility into cross-service latency breakdown
- correlated telemetry across logs, metrics, and traces
- instrumentation that remains stable as services evolve

## Common Production Mistakes

- creating spans without propagating context correctly
- recording too little context to explain latency or failures
- attaching sensitive payloads directly to spans
- enabling tracing without thinking about sampling cost
- tracing only HTTP requests and ignoring async workflows

## Maintainability Rules

- standardize tracing libraries and propagation strategy
- instrument service boundaries, dependency calls, and async handoffs
- keep span attributes useful, bounded, and privacy-safe
- connect trace ids with structured logs and metrics where possible
