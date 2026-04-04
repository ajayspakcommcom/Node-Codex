# Layered Architecture For Enterprise Node.js And TypeScript

## Purpose

This topic is about structuring a backend codebase into clear layers so responsibilities stay separated and the system remains easier to change as it grows.

The goal is not only to memorize layer names. The goal is to understand why enterprise teams use layering, how dependency direction should work, and how to avoid turning architecture into ceremony.

In enterprise systems, layered architecture matters because backend services must be:

- easier to review
- easier to test
- easier to extend
- safer to refactor
- clearer for multiple engineers to work in at the same time

## What This Section Covers

- what layered architecture is
- why enterprise teams use layered architecture
- presentation layer
- controller layer
- service layer
- repository or data-access layer
- infrastructure layer
- dependency direction between layers
- separation of concerns
- request flow across layers
- DTOs and boundary contracts
- validation at the boundary
- keeping business logic in services
- keeping persistence logic in repositories
- avoiding fat controllers
- avoiding leaked infrastructure details
- testability benefits of layering
- maintainability benefits of layering
- common mistakes in layered systems
- when layering becomes too rigid
- pragmatic layering vs overengineering
- folder structure for layered Node.js apps
- interview-style questions
- practice exercises

## Enterprise Context

Without clear structure, backend services tend to accumulate:

- HTTP logic mixed with business logic
- business rules mixed with database queries
- infrastructure details leaking everywhere
- duplicated validation and formatting
- hard-to-follow request flow

Layered architecture is one of the most common ways enterprise teams reduce that chaos.

The important point is not to create many folders for their own sake. The point is to create boundaries that make the code easier to reason about and safer to change.

## 1. What Layered Architecture Is

### Enterprise View

Layered architecture separates a backend system into parts with different responsibilities, such as transport, business logic, persistence, and infrastructure.

### Enterprise Rule

- use layers to clarify responsibilities, not to decorate the codebase with architecture vocabulary

## 2. Why Enterprise Teams Use Layered Architecture

### Enterprise Relevance

As codebases grow, teams need a structure that reduces coupling and makes changes more predictable.

### Enterprise Rule

- prefer boundaries that make changes local and reviewable instead of spreading one concern across many files

## 3. Presentation Layer

### Enterprise Relevance

The presentation layer handles transport concerns such as HTTP input, routing, serialization, and status-code behavior.

### Enterprise Rule

- keep transport concerns at the boundary and avoid embedding domain rules deeply here

## 4. Controller Layer

### Enterprise Relevance

Controllers receive validated input, delegate work, and shape responses.

### Enterprise Rule

- keep controllers thin and orchestration-focused

## 5. Service Layer

### Enterprise Relevance

The service layer holds business workflows, decisions, and policy-like behavior.

### Enterprise Rule

- keep core business logic in services instead of scattering it across controllers and repositories

## 6. Repository Or Data-Access Layer

### Enterprise Relevance

Repositories isolate persistence logic and give the service layer a clearer data boundary.

### Enterprise Rule

- keep database and storage access explicit and separate from business logic

## 7. Infrastructure Layer

### Enterprise Relevance

Infrastructure concerns include database clients, external APIs, cache clients, queues, and file storage integrations.

### Enterprise Rule

- keep infrastructure details from leaking into unrelated layers

## 8. Dependency Direction Between Layers

### Enterprise Relevance

Layering only helps when dependencies flow in a controlled direction.

### Enterprise Rule

- outer layers may depend on inner business logic, but business rules should not depend directly on transport details

## 9. Separation Of Concerns

### Enterprise Relevance

Separation of concerns is the main reason layered architecture exists.

### Enterprise Rule

- each layer should answer one kind of question clearly

## 10. Request Flow Across Layers

### Enterprise Relevance

A typical request may move through:

- route
- validation
- controller
- service
- repository
- infrastructure client

### Enterprise Rule

- keep the flow explicit so engineers can trace behavior quickly

## 11. DTOs And Boundary Contracts

### Enterprise Relevance

Different layers often need explicit contracts so internal persistence models do not leak into public responses.

### Enterprise Rule

- use DTOs or explicit data contracts at important layer boundaries

## 12. Validation At The Boundary

### Enterprise Relevance

Bad input should not flow deep into the system.

### Enterprise Rule

- validate requests at the transport boundary before service logic runs

## 13. Keeping Business Logic In Services

### Enterprise Relevance

Business logic belongs where it can be tested and changed without HTTP or database concerns getting in the way.

### Enterprise Rule

- keep services responsible for business workflows and decisions

## 14. Keeping Persistence Logic In Repositories

### Enterprise Relevance

Repositories improve clarity and make persistence changes less invasive.

### Enterprise Rule

- keep queries and storage-specific behavior out of controllers and business orchestration where possible

## 15. Avoiding Fat Controllers

### Enterprise Relevance

Fat controllers become difficult to test and easy to duplicate.

### Enterprise Rule

- controllers should coordinate, not contain the whole application

## 16. Avoiding Leaked Infrastructure Details

### Enterprise Relevance

Business layers should not be tightly coupled to one ORM, HTTP library, or vendor client unless the team accepts that tradeoff consciously.

### Enterprise Rule

- keep infrastructure dependencies behind explicit boundaries

## 17. Testability Benefits Of Layering

### Enterprise Relevance

Layering makes it easier to test business logic independently from HTTP or persistence details.

### Enterprise Rule

- structure layers so tests can target one concern at a time

## 18. Maintainability Benefits Of Layering

### Enterprise Relevance

Clear layers reduce review noise, improve onboarding, and lower the risk of broad accidental changes.

### Enterprise Rule

- use layering to reduce coupling and clarify ownership

## 19. Common Mistakes In Layered Systems

### Common Mistakes

- duplicating business logic in controllers and services
- making repositories contain business policy
- leaking ORM models directly into API responses
- allowing infrastructure clients to spread through the whole codebase
- creating so many layers that basic changes become slow and confusing

### Enterprise Rule

- layers should simplify change, not make every change ceremonial

## 20. When Layering Becomes Too Rigid

### Enterprise Relevance

Architecture can become harmful if the team follows layer rules blindly without considering actual complexity.

### Enterprise Rule

- use layering pragmatically and adjust it to real system size and team needs

## 21. Pragmatic Layering Vs Overengineering

### Enterprise Relevance

Not every application needs maximum abstraction from day one.

### Enterprise Rule

- start with clear boundaries, then increase abstraction only when real complexity justifies it

## 22. Folder Structure For Layered Node.js Apps

### Enterprise Relevance

Folder structure should make the boundaries obvious to engineers reading the code.

### Example Shape

```text
src/
  app/
  config/
  common/
  modules/
    tasks/
      task.controller.ts
      task.service.ts
      task.repository.ts
      task.routes.ts
      task.validator.ts
  lib/
    db.ts
    cache.ts
```

### Enterprise Rule

- choose a structure that makes layer boundaries visible without making navigation harder

## 23. Interview-Style Questions

- What problem does layered architecture solve in backend systems?
- Why should controllers stay thin?
- Why is dependency direction important in layered architecture?
- What belongs in a service layer vs a repository layer?
- What risks come from leaking infrastructure details into business logic?
- When can layering become overengineered?

## 24. Practice Exercises

- Refactor a fat controller into controller, service, and repository layers.
- Map a persistence model into a DTO before returning it from an API layer.
- Move direct database logic out of a controller and into a repository.
- Define dependency rules for a layered Node.js module.
- Review a small codebase and identify where layering is too weak or too rigid.

## Outcome

After this topic, you should be able to:

- explain why layered architecture helps enterprise Node services
- separate transport, business, persistence, and infrastructure concerns more clearly
- keep dependency direction cleaner
- design backend modules that are easier to test and change safely
