# Tracing (OpenTelemetry) Code

This code set demonstrates enterprise-style tracing patterns for distributed Node.js systems.

## Coverage

- traces and spans
- parent-child span relationships
- W3C-style trace context propagation awareness
- service boundary instrumentation
- dependency latency tracing
- async workflow tracing
- sampling awareness
- trace-to-log correlation
- privacy-safe span attributes
- maintainability patterns

## Notes

- examples use a small in-repo tracing model to focus on architecture and flow
- the goal is to show how trace context moves across boundaries
- these examples model OpenTelemetry-style thinking without binding to one SDK
