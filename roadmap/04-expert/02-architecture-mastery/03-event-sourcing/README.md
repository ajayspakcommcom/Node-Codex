# Event Sourcing

## Purpose

This topic is about storing immutable domain events as the source of truth when auditability, replayability, and historical reconstruction are core business requirements.

## Enterprise-Level Pointers

- event store as system of record
- immutable history
- snapshotting strategy
- replay semantics
- schema evolution for events
- event versioning
- projection rebuilds
- debugging and operational complexity
- compliance and audit implications
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Expert Teams Optimize For

- complete historical trace of business state changes
- replayable models and recoverable projections
- strong auditability where the domain genuinely requires it
- explicit management of the complexity this pattern introduces

## Common Production Mistakes

- choosing event sourcing for novelty instead of domain need
- ignoring event versioning and long-term schema evolution
- assuming replay is cheap at every scale
- underestimating debugging and operational complexity

## Maintainability Rules

- adopt event sourcing only when immutable history materially matters
- define event versioning rules before the first production release
- make snapshot and replay policies explicit
- separate write-model truth from projection convenience

## Interview Questions

- When is event sourcing worth the complexity?
- What changes operationally when events become the system of record?
- How do you handle schema evolution in an event-sourced system?

## Practice Exercises

- Model an event-sourced aggregate with a snapshot policy.
- Define event versioning rules for a long-lived domain.
- Write a projection rebuild and replay plan.
