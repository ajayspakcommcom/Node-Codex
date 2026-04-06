# Event-Driven Architecture

## Purpose

Event-driven architecture lets systems react to business events asynchronously so services can evolve independently while still coordinating workflows across boundaries.

## Enterprise-Level Pointers

- what event-driven architecture is in real distributed systems
- events vs commands
- domain events vs integration events
- event producers and event consumers
- loose coupling benefits and tradeoffs
- eventual consistency awareness
- choreography vs orchestration
- event ownership and bounded context discipline
- event schema contracts and versioning awareness
- publishing events after state changes safely
- duplicate, delayed, and out-of-order event handling
- replay and reprocessing awareness
- side-effect isolation in event consumers
- idempotent event handlers
- fan-out patterns and downstream dependency awareness
- event discovery and documentation discipline
- observability across event flows
- debugging distributed event chains
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- independent service evolution without tight runtime coupling
- explicit event ownership and contract stability
- safe eventual consistency across workflows
- traceability across asynchronous business flows

## Common Production Mistakes

- using events as hidden RPC instead of true asynchronous communication
- emitting vague or unstable event names
- allowing multiple teams to mutate the same event contract without ownership rules
- assuming consumers process events immediately or in order
- mixing commands and events until workflows become unclear

## Maintainability Rules

- use events to describe facts that happened, not instructions disguised as facts
- keep event schemas explicit, versioned, and documented
- design consumers to tolerate duplicates and timing variance
- trace event flow across producers, brokers, and consumers
- use event-driven architecture where decoupling is valuable, not as default complexity

## Interview Questions

- what is the difference between an event and a command
- when is choreography better than orchestration
- why is eventual consistency a core design concern in event-driven systems
- how do you keep event contracts stable across multiple services
- how do you debug a workflow that spans multiple asynchronous consumers

## Practice Exercises

- design an order workflow using domain events and integration events
- model the same business process once with choreography and once with orchestration
- define an event versioning strategy for `order.created`
- design an idempotent consumer for duplicate `payment.captured` events
