# Database Basics For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding databases the way real backend systems use them.

The goal is not only to learn CRUD operations. It is to understand how data is modeled, protected, queried, and exposed safely inside a maintainable application.

In enterprise systems, database work should be:

- predictable
- constrained
- easy to reason about
- safe to evolve
- separated from transport-layer code

Weak database design creates:

- inconsistent data
- slow queries
- hard-to-change schemas
- duplicated access logic
- fragile APIs that leak storage details

## What This Section Covers

- what a database is in backend systems
- relational vs non-relational databases
- tables, rows, documents, and collections
- schema basics
- primary keys
- foreign keys
- indexes
- CRUD queries
- filtering and sorting
- pagination basics
- relationships
- normalization basics
- data integrity basics
- constraints
- transactions basics
- connection management basics
- migration discipline
- ORM and query-builder overview
- repository pattern basics
- mapping database models to domain and API responses
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

Databases are not just storage. They are part of the system contract.

In enterprise teams, the important questions are:

- how is data modeled
- how is integrity protected
- how are queries kept efficient
- how are schema changes managed safely
- how is persistence separated from controllers and services

A database layer that "works" is not enough.

It should also support:

- clean service boundaries
- safe changes over time
- operational visibility
- performance under load

## 1. What A Database Is In Backend Systems

### Enterprise View

A database stores application state in a durable and queryable form.

### Enterprise Rule

- treat the database as a core system dependency with explicit contracts and rules

## 2. Relational Vs Non-Relational Databases

### Enterprise Relevance

Most enterprise backend systems choose storage based on access patterns, consistency needs, and operational simplicity.

### Relational Strengths

- structured schema
- joins and relationships
- strong integrity rules
- transaction support

### Non-Relational Strengths

- flexible document shapes
- easier horizontal patterns for some workloads
- simpler modeling for event or document-heavy systems

### Enterprise Rule

- choose storage based on system needs, not trends

## 3. Tables, Rows, Documents, And Collections

### Enterprise Relevance

Different databases organize data differently, but every system still needs clear ownership of data shape and lifecycle.

### Enterprise Rule

- model data so engineers can understand what each record represents and who owns it

## 4. Schema Basics

### Enterprise Relevance

Schemas define what valid data looks like.

### Enterprise Rule

- keep schemas explicit and stable
- do not allow uncontrolled shape drift

## 5. Primary Keys

### Enterprise Relevance

Every important record needs a stable identity.

### Enterprise Rule

- use predictable primary keys and keep identity separate from mutable business fields

## 6. Foreign Keys

### Enterprise Relevance

Relationships between records should be explicit when the data model needs them.

### Enterprise Rule

- enforce relationships clearly where integrity matters

## 7. Indexes

### Enterprise Relevance

Indexes make common queries faster, but unnecessary indexes increase write cost and operational complexity.

### Enterprise Rule

- add indexes for real query patterns, not by guesswork

## 8. CRUD Queries

### Enterprise Relevance

Basic create, read, update, and delete operations are the foundation of most services.

### Enterprise Rule

- keep query logic centralized and predictable
- avoid scattering raw queries across controllers

## 9. Filtering And Sorting

### Enterprise Relevance

APIs often need queryable lists, but weak filtering and sorting logic becomes slow and inconsistent.

### Enterprise Rule

- support filtering and sorting intentionally and only on approved fields

## 10. Pagination Basics

### Enterprise Relevance

Enterprise APIs should not return unbounded datasets.

### Enterprise Rule

- paginate list endpoints by default
- define maximum page sizes

## 11. Relationships

### Enterprise Relevance

Real systems contain users, orders, invoices, products, sessions, and many other related entities.

### Enterprise Rule

- make relationships explicit in the data model and in repository boundaries

## 12. Normalization Basics

### Enterprise Relevance

Normalization reduces duplication and inconsistency in relational systems.

### Enterprise Rule

- normalize where it improves integrity and maintainability
- denormalize only with clear performance or access-pattern reasons

## 13. Data Integrity Basics

### Enterprise Relevance

Integrity means the database should resist invalid or contradictory state.

### Enterprise Rule

- enforce important invariants in the data layer, not only in controller code

## 14. Constraints

### Enterprise Relevance

Constraints such as unique, not-null, and foreign-key rules protect the system from invalid writes.

### Enterprise Rule

- use constraints to protect critical business assumptions

## 15. Transactions Basics

### Enterprise Relevance

Some operations must either fully succeed or fully fail.

### Enterprise Rule

- use transactions when multiple related writes must remain consistent

## 16. Connection Management Basics

### Enterprise Relevance

Opening database connections incorrectly can create instability and poor throughput.

### Enterprise Rule

- manage connection lifecycle centrally
- use pooling patterns instead of ad hoc connection creation

## 17. Migration Discipline

### Enterprise Relevance

Schema changes must be repeatable, reviewable, and safe across environments.

### Enterprise Rule

- treat schema migrations as versioned system changes, not manual admin tasks

## 18. ORM And Query-Builder Overview

### Enterprise Relevance

Teams often use ORMs or query builders to improve consistency and reduce raw query sprawl.

### Enterprise Rule

- use these tools for clarity and maintainability, not to hide query behavior blindly

## 19. Repository Pattern Basics

### Enterprise Relevance

Repositories create a clear persistence boundary between services and storage.

### Enterprise Rule

- keep database access behind explicit repository interfaces

## 20. Mapping Database Models To Domain And API Responses

### Enterprise Relevance

Database rows or documents should not automatically become public API responses.

### Enterprise Rule

- map persistence models to DTOs or domain shapes intentionally

## 21. Common Production Mistakes

### Common Mistakes

- leaking raw database models into API responses
- missing indexes on frequently filtered fields
- allowing unbounded list queries
- putting raw queries inside controllers
- ignoring transaction boundaries
- overfetching data
- building schema changes manually without migrations
- tightly coupling business logic to ORM-specific behavior
- ignoring unique constraints and relying only on application checks
- creating N+1 query patterns

### Enterprise Rule

- treat data access as a design responsibility, not just an implementation detail

## 22. Maintainability Rules

- keep schema and migration history explicit
- separate controllers, services, and repositories
- centralize query logic
- validate at the API boundary and enforce integrity at the data boundary
- expose DTOs instead of raw persistence models
- paginate list queries by default
- review indexes as part of feature design
- keep transactions small and purposeful
- document important data invariants

## 23. Interview-Style Questions

- What is the difference between relational and non-relational databases?
- Why do primary keys and foreign keys matter?
- What problem do indexes solve?
- Why should APIs paginate database-backed list endpoints?
- What is the purpose of a transaction?
- Why should controllers avoid direct database queries?
- What is the benefit of a repository layer?
- Why should database models not be returned directly to clients?

## 24. Practice Exercises

- Design a relational schema for users, products, orders, and order items.
- Add indexes for common search and filter patterns.
- Write repository methods for create, read, update, and paginated list operations.
- Model a transaction that creates an order and reserves inventory.
- Refactor a controller that queries the database directly into controller, service, and repository layers.
- Map a persistence model into a safe API response DTO.

## Outcome

After this topic, you should be able to:

- reason about database design with enterprise constraints in mind
- model data with keys, relationships, constraints, and indexes
- keep query logic separated from API handlers
- understand when transactions and migrations matter
- build a cleaner persistence layer for Node.js services
