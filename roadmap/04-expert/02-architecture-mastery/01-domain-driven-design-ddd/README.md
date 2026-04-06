# Domain-Driven Design (DDD)

## Purpose

This topic is about using Domain-Driven Design to create stable business boundaries, reduce accidental coupling, and improve ownership clarity across large systems and teams.

## Enterprise-Level Pointers

- bounded contexts
- ubiquitous language
- aggregates and invariants
- entities and value objects
- domain services vs application services
- anti-corruption layers
- strategic design across teams
- context mapping
- organizational alignment with architecture
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Expert Teams Optimize For

- business boundaries that remain stable as systems grow
- shared language between product, engineering, and operations
- fewer accidental cross-domain dependencies
- team ownership aligned with domain ownership

## Common Production Mistakes

- using DDD terminology without changing real boundaries
- turning every model into a complex aggregate without need
- mixing domain logic with transport or persistence concerns
- ignoring organizational boundaries while designing context boundaries

## Maintainability Rules

- define bounded contexts before splitting services
- keep invariants close to the aggregate that owns them
- use anti-corruption layers when crossing legacy or foreign boundaries
- let business language shape domain models, not database shape alone

## Interview Questions

- When is DDD useful, and when is it unnecessary overhead?
- How do bounded contexts differ from microservices?
- What problems do anti-corruption layers solve?

## Practice Exercises

- Define bounded contexts for a SaaS product with billing, identity, reporting, and support.
- Model one aggregate with clear invariants and ownership.
- Write a context map between two domains with an anti-corruption layer.
