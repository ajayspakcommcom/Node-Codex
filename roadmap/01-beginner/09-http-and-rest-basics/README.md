# HTTP And REST Basics For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding the web boundary of a backend service.

In enterprise systems, HTTP and REST are not just concepts for building simple routes. They define how clients and services communicate in a predictable, maintainable, and safe way.

This topic focuses on:

- correct HTTP semantics
- stable API contracts
- clean resource design
- safe boundary handling
- consistency across teams and services

Weak HTTP and REST understanding creates:

- confusing APIs
- wrong status codes
- inconsistent responses
- client integration problems
- harder maintenance over time

## What This Section Covers

- what HTTP is in backend systems
- request and response lifecycle
- HTTP methods
- safe vs unsafe methods
- idempotency basics
- status codes
- headers
- content types
- JSON request and response handling
- query parameters
- route parameters
- cookies basics
- authentication headers basics
- REST principles
- resources and resource-oriented URL design
- request validation at the HTTP boundary
- consistent response shape
- error response basics
- pagination basics
- filtering and sorting basics
- API versioning basics
- common API design mistakes
- maintainability rules for HTTP APIs
- interview-style questions
- practice exercises

## Enterprise Context

In enterprise backend systems, APIs are contracts.

That means engineers need to care about:

- how requests enter the system
- how responses are shaped
- what clients are allowed to depend on
- how changes are introduced safely

An API that "works" is not enough.

The API should also be:

- understandable
- consistent
- backward-safe where needed
- easy to diagnose

## 1. What HTTP Is In Backend Systems

### Enterprise View

HTTP is the transport protocol used by most backend APIs to receive requests and send responses.

### Enterprise Rule

- understand HTTP as the boundary between clients and services, not just framework syntax

## 2. Request And Response Lifecycle

### Enterprise Relevance

A request typically passes through:

- transport boundary
- validation
- authentication or authorization
- business logic
- persistence or integration logic
- response formatting

### Enterprise Rule

- think of HTTP handling as a full boundary workflow, not only a route callback

## 3. HTTP Methods

### Core Methods

- `GET`
- `POST`
- `PUT`
- `PATCH`
- `DELETE`

### Enterprise Rule

- use methods according to their intended meaning
- do not overload one method for every action

## 4. Safe Vs Unsafe Methods

### Safe Methods

Methods like `GET` should not change server state.

### Unsafe Methods

Methods like `POST`, `PUT`, `PATCH`, and `DELETE` can change state.

### Enterprise Rule

- do not perform state-changing behavior inside endpoints that should be safe

## 5. Idempotency Basics

### Enterprise Relevance

Some operations can be repeated safely without changing the result beyond the first successful application.

This matters for:

- retries
- client reconnects
- network instability

### Enterprise Rule

- understand which operations are idempotent
- design retry-sensitive operations carefully

## 6. Status Codes

### Enterprise Relevance

Status codes communicate the outcome of an HTTP request clearly to clients and systems.

### Important Groups

- `2xx` success
- `4xx` client-side/request-side problems
- `5xx` server-side/internal failures

### Enterprise Rule

- use status codes intentionally
- do not return `200` for every outcome

## 7. Headers

### Enterprise Relevance

Headers carry important metadata such as:

- content type
- authentication tokens
- caching directives
- correlation/request ids

### Enterprise Rule

- treat headers as part of the contract
- parse and validate important headers carefully

## 8. Content Types

### Enterprise Relevance

Content type handling defines how data is interpreted.

Common examples:

- `application/json`
- `multipart/form-data`

### Enterprise Rule

- make request and response formats explicit
- do not assume every payload is valid JSON automatically

## 9. JSON Request And Response Handling

### Enterprise Relevance

JSON is the most common API payload format in backend systems.

### Enterprise Rule

- validate parsed input
- keep JSON response structure consistent
- avoid accidental shape drift across endpoints

## 10. Query Parameters

### Enterprise Use

Query parameters are commonly used for:

- filtering
- sorting
- pagination
- optional API controls

### Enterprise Rule

- validate query parameters
- keep semantics predictable

## 11. Route Parameters

### Enterprise Use

Route parameters commonly identify resources such as:

- `/users/:id`
- `/orders/:orderId`

### Enterprise Rule

- use route parameters for resource identity
- validate them before using them in business logic

## 12. Cookies Basics

### Enterprise Relevance

Cookies are part of the web boundary and appear in:

- session-based auth
- browser flows
- some legacy integrations

### Enterprise Rule

- understand cookies as transport-level state
- apply secure handling where relevant

## 13. Authentication Headers Basics

### Enterprise Relevance

Headers such as `Authorization` often carry identity or access credentials.

### Enterprise Rule

- treat authentication headers carefully
- keep auth parsing outside business logic where possible

## 14. REST Principles

### Enterprise Relevance

REST principles encourage:

- resource-oriented design
- stateless interactions
- predictable URI patterns
- method semantics that match the action

### Enterprise Rule

- use REST as a design discipline for maintainable APIs
- do not create RPC-style endpoints when resource-oriented modeling is clearer

## 15. Resources And Resource-Oriented URL Design

### Good Examples

- `/users`
- `/users/:id`
- `/orders/:id/payments`

### Enterprise Rule

- name URLs around resources and relationships
- keep paths consistent and readable

## 16. Request Validation At The HTTP Boundary

### Enterprise Relevance

External input should be validated before business logic runs.

### Enterprise Rule

- validate body, params, query, and important headers at the boundary
- do not let invalid transport input leak deep into the service

## 17. Consistent Response Shape

### Enterprise Relevance

Clients and teams benefit from predictable response patterns.

### Enterprise Rule

- keep success responses consistent
- keep error responses consistent
- avoid one-off endpoint-specific shapes unless justified

## 18. Error Response Basics

### Enterprise Relevance

Clients need useful failure information without seeing internal details.

### Enterprise Rule

- return safe, stable error responses
- match status codes to the real failure category

## 19. Pagination Basics

### Enterprise Relevance

APIs that return large collections usually need pagination for performance and usability.

### Enterprise Rule

- do not return unbounded collections casually
- make pagination behavior explicit

## 20. Filtering And Sorting Basics

### Enterprise Relevance

Filtering and sorting are common API concerns that affect:

- usability
- performance
- contract clarity

### Enterprise Rule

- keep filtering and sorting conventions consistent
- validate allowed fields and values

## 21. API Versioning Basics

### Enterprise Relevance

Versioning becomes important when clients depend on stable contracts over time.

### Enterprise Rule

- treat breaking changes seriously
- use versioning intentionally when contract stability requires it

## 22. Common API Design Mistakes

- using the wrong HTTP method
- returning the wrong status code
- inconsistent JSON shapes
- putting transport parsing inside business logic
- exposing internal error details
- creating action-heavy non-resource URLs without good reason
- ignoring validation at the boundary
- returning unbounded lists

## Maintainability Rules For HTTP APIs

- keep transport concerns at the boundary
- use consistent status codes
- use consistent response shapes
- validate external input early
- design URLs around resources
- keep API contracts explicit and predictable

## What Enterprise Teams Expect At This Level

- understand core HTTP method semantics
- use status codes correctly
- understand basic REST design
- validate transport input properly
- return predictable responses
- design beginner-level APIs that clients can trust

## Suggested Code Components For This Topic

When implementing this topic in code, the examples should include:

- HTTP method examples
- status code mapping examples
- JSON request and response example
- headers and cookies example
- RESTful route design example
- validation-at-boundary example
- pagination/filter/sort example
- bad API pattern vs corrected pattern example

## Interview-Style Questions

- Why do HTTP method semantics matter in API design?
- Why is returning the right status code important?
- What makes an API more RESTful?
- Why should validation happen at the HTTP boundary?
- Why are consistent response shapes important for clients?
- Why can unbounded list endpoints become a problem?
- What is the role of headers in API requests?
- Why is API design a maintainability concern?

## Practice Exercises

1. Design a RESTful route structure for a simple order system.
2. Map several API outcomes to correct HTTP status codes.
3. Create a response shape for a paginated endpoint.
4. Refactor an action-heavy API path into a resource-oriented design.
5. Add boundary validation rules to an example request shape.

## Completion Standard

You are ready to move beyond this topic when you can:

- choose the right HTTP method for a use case
- return the right status code for common outcomes
- explain the basics of REST resource design
- validate API input at the boundary
- keep beginner-level APIs consistent and maintainable

## Important Reminder

HTTP and REST are not just documentation topics.

In enterprise systems, they shape:

- client trust
- integration stability
- operational clarity
- long-term API maintainability
