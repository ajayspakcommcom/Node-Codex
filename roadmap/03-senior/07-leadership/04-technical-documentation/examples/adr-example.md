# ADR: Use Message Queue For Invoice Generation

- status: accepted
- date: 2026-04-06
- owner: billing-platform-team

## Context

Invoice generation currently runs in the synchronous request path and increases checkout latency during traffic spikes.

## Decision

Move invoice generation to an asynchronous queue-backed worker flow.

## Consequences

- improves checkout latency and request-path stability
- introduces eventual consistency and queue observability requirements
- requires idempotent worker behavior and dead-letter handling

