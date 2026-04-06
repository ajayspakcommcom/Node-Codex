# System Design

## Purpose

This section focuses on large-scale architecture decisions for backend platforms.

At the senior level, system design matters because engineers need to explain why services are split, where gateways belong, how traffic is distributed, and what kinds of scaling decisions increase or reduce operational risk.

## Topics

- monolith vs microservices
- API gateway
- load balancing
- horizontal scaling
- database sharding

## Enterprise Pointers

- choose architecture based on tradeoffs, not trends
- keep service boundaries aligned with ownership and operational reality
- design for resilience and latency, not just for logical separation
- understand how scaling choices affect data consistency and operational complexity
- make system design decisions that teams can actually operate long term
