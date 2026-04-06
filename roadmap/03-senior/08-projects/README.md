# Senior Projects

## Purpose

This section focuses on capstone-style systems that force real architectural tradeoffs.

At the senior level, projects should not only be larger. They should reveal decisions about scale, service boundaries, resilience, observability, and operational safety.

## Topics

- microservices-based system
- event-driven order processing
- high-traffic API

## Enterprise-Level Pointers

- choose projects that expose real system-level tradeoffs instead of only feature complexity
- design projects with explicit service boundaries, failure handling, and operational visibility
- include observability, resilience, rollout, and scaling decisions as core project requirements
- model team-facing concerns such as contracts, ownership, and change management
- make infrastructure, deployment, and incident response part of the project architecture
- force tradeoffs around latency, consistency, throughput, and recovery instead of hiding them
- use projects to integrate architecture, security, observability, and operations into one system
- build systems that resemble enterprise workloads rather than larger CRUD demos

## Section Scope

This section should cover:

- end-to-end project architectures that combine multiple senior topics
- project designs that require real production-style tradeoffs
- systems where contracts, resilience, observability, and deployments all matter
- projects that can be discussed like architecture case studies

## What Enterprise Teams Optimize For

- realistic architecture under scale and failure pressure
- strong service boundaries and operational ownership
- safe deployment and rollback behavior
- observable and debuggable systems in production-like conditions
- project structure that reflects how large teams actually build systems

## Common Production Mistakes

- building a “microservices” project that is only multiple small apps without real boundaries
- adding distributed complexity without observability or failure handling
- focusing on throughput claims without capacity, scaling, or cost reasoning
- treating project architecture as diagrams only instead of executable operational design
- skipping rollout, recovery, and contract strategy in “advanced” projects

## Maintainability Rules

- define architecture boundaries and ownership explicitly
- document tradeoffs and failure modes as part of the project
- include operations, observability, and rollout strategy in project scope
- review project design like a production system, not a portfolio demo

## Interview Questions

- what makes a senior project meaningfully different from an intermediate project
- how should a capstone project demonstrate architectural maturity
- why are observability, resilience, and deployment strategy part of the project itself
- how would you evaluate whether a “microservices” project is realistic or superficial

## Practice Exercises

- design a project review rubric for a senior-level Node.js system
- define the non-functional requirements for an event-driven order platform
- compare a high-traffic API project with a microservices platform in terms of tradeoffs and operational complexity
