# System Design

## Purpose

This section focuses on large-scale backend architecture decisions under real operational pressure.

At the senior level, system design matters because engineers need to explain why systems are split, where traffic controls belong, how scale changes failure modes, and how architectural decisions affect reliability, operability, team ownership, and cost.

## Topics

- monolith vs microservices
- API gateway
- load balancing
- horizontal scaling
- database sharding

## Enterprise Pointers

- choose architecture based on tradeoffs, not trends or interview vocabulary
- keep service boundaries aligned with team ownership, deployment safety, and failure isolation
- treat gateways, load balancing, and scaling as reliability concerns, not only traffic-routing topics
- understand how scaling decisions affect consistency, coordination, latency, and cost
- prefer designs that teams can debug, evolve, and operate under incident pressure

## Enterprise Context

Senior system design work is rarely about drawing boxes alone. It is about deciding which failure modes are acceptable, which dependencies are allowed to couple, which parts of the system should scale independently, and where operational control should live.

Weak system design usually looks like:

- choosing microservices before understanding the monolith's bottlenecks
- adding gateways or sharding because they sound advanced
- treating horizontal scaling as a free fix for inefficient application behavior
- ignoring how architecture changes affect observability, ownership, and on-call burden
- creating distributed complexity without clear business or operational benefit

The important question is not only "can this architecture work?" The real question is:

- can this architecture be operated, debugged, and evolved safely as traffic, teams, and business scope grow

## Suggested Topic Focus

This section should train senior engineers to reason about:

- service boundary tradeoffs
- ingress and edge control points
- traffic distribution and failure isolation
- stateful vs stateless scaling
- data partitioning costs and escape hatches
