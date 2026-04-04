# Error Handling For Enterprise Node.js And TypeScript

## Purpose

Error handling is one of the most important beginner topics in backend engineering.

Enterprise systems are judged not only by how they work on the happy path, but by how they behave when things go wrong.

This topic is about building systems that fail in ways that are:

- predictable
- observable
- safe for users
- understandable for engineers
- maintainable over time

Weak error handling creates:

- inconsistent API responses
- lost debugging context
- hidden failures
- unstable runtime behavior
- hard-to-maintain code paths

## What This Section Covers

- what an error is in application code
- operational errors vs programmer errors
- `try/catch`
- throwing errors intentionally
- async error handling
- promise rejection handling
- custom error classes
- validation errors
- business rule errors
- infrastructure and external-service errors
- error propagation
- centralized error handling
- safe API error responses
- logging and diagnostic context
- what not to expose to clients
- process-level errors at a basic level
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

In enterprise backend systems, failures are normal.

Examples include:

- invalid user input
- missing resources
- database failures
- network failures
- third-party API errors
- unexpected programmer mistakes

The goal is not to eliminate every error.

The goal is to:

- categorize errors correctly
- respond safely
- log enough context for diagnosis
- avoid corrupting system behavior

## 1. What An Error Is In Application Code

### Enterprise View

An error is any condition where the system cannot continue the current operation normally.

### Enterprise Rule

- treat error handling as part of the main design, not as an afterthought

## 2. Operational Errors Vs Programmer Errors

### Operational Errors

Examples:

- missing file
- invalid request input
- database timeout
- network failure
- third-party service unavailable

### Programmer Errors

Examples:

- undefined access caused by bad code
- broken assumptions
- invalid logic
- improper state handling

### Enterprise Rule

- distinguish expected operational failures from bugs in the code
- operational errors should often be handled
- programmer errors should usually be surfaced and fixed, not hidden

## 3. `try/catch`

### Enterprise Relevance

`try/catch` is a basic tool, but it should be used carefully.

### Enterprise Rule

- catch errors when you can add value
- do not catch errors just to ignore them
- keep the error path understandable

## 4. Throwing Errors Intentionally

### Enterprise Relevance

Errors should be thrown with purpose when the system cannot safely continue a specific operation.

### Enterprise Rule

- throw errors with clear meaning
- prefer meaningful messages and error types over vague failures

## 5. Async Error Handling

### Enterprise Relevance

Most backend work in Node.js is asynchronous, so error handling must cover:

- async functions
- promise-based code
- request handlers
- background tasks

### Enterprise Rule

- understand how async failures propagate
- do not assume sync and async errors behave identically

## 6. Promise Rejection Handling

### Enterprise Relevance

Unhandled promise rejections can create unstable services and confusing production behavior.

### Enterprise Rule

- every promise chain should have a clear rejection path
- do not ignore async failures

## 7. Custom Error Classes

### Enterprise Relevance

Custom error types help separate categories such as:

- validation failures
- authorization failures
- domain rule violations
- infrastructure failures

### Enterprise Rule

- use custom error classes where they improve clarity
- do not create unnecessary error hierarchies without real benefit

## 8. Validation Errors

### Enterprise Relevance

Validation errors are among the most common operational failures in APIs.

### Enterprise Rule

- treat validation failures as expected input errors
- return safe, consistent responses
- do not treat user validation mistakes like internal server crashes

## 9. Business Rule Errors

### Examples

- order already paid
- account disabled
- insufficient balance
- state transition not allowed

### Enterprise Rule

- represent domain failures clearly
- separate domain logic errors from transport and infrastructure issues

## 10. Infrastructure And External-Service Errors

### Examples

- database unavailable
- queue push failure
- upstream HTTP service timeout
- filesystem failure

### Enterprise Rule

- do not blur infrastructure failure with user mistakes
- log technical context for diagnosis
- return client-safe responses

## 11. Error Propagation

### Enterprise Relevance

Errors should travel through the system in a predictable way.

For example:

- repository throws or returns failure
- service interprets or rethrows
- controller or boundary formats safe response

### Enterprise Rule

- keep error flow explicit
- avoid swallowing useful context

## 12. Centralized Error Handling

### Enterprise Relevance

Large applications usually centralize response formatting and final error handling behavior.

### Enterprise Rule

- centralize repeated error-response logic
- do not duplicate ad hoc error formatting in every handler

## 13. Safe API Error Responses

### Enterprise Relevance

Clients need useful error responses, but not internal implementation details.

### Enterprise Rule

- give clients stable and safe error information
- keep internal debugging detail out of public responses

## 14. Logging And Diagnostic Context

### Enterprise Relevance

Logs should capture enough information to diagnose failures.

Useful context often includes:

- request id
- route
- user or actor id when appropriate
- operation name
- error type

### Enterprise Rule

- log with context
- avoid noisy logs that hide useful signal

## 15. What Not To Expose To Clients

### Do Not Expose

- stack traces
- secrets
- database internals
- internal implementation details
- sensitive infrastructure information

### Enterprise Rule

- clients get safe messages
- engineers get diagnostic details through logs and monitoring

## 16. Process-Level Errors At A Basic Level

### Enterprise Relevance

At the process level, failures such as:

- uncaught exceptions
- unhandled rejections

must be treated seriously.

### Enterprise Rule

- process-level failures should be observable
- do not pretend the service is healthy after severe unrecoverable runtime corruption

## 17. Common Production Mistakes

- catching errors and ignoring them
- returning different error shapes from different handlers
- exposing internal error details to clients
- not logging enough context
- treating all failures as `500`
- swallowing promise rejections
- mixing domain errors and infrastructure errors
- overusing generic `Error` without meaningful categorization
- duplicating error formatting logic everywhere

## Maintainability Rules

- define clear error categories
- centralize repeated error handling behavior
- keep error paths explicit
- separate client-safe responses from internal diagnostics
- use errors to improve clarity, not just control flow
- keep logs useful and structured

## What Enterprise Teams Expect At This Level

- understand the difference between expected operational errors and code bugs
- use `try/catch` correctly
- handle async failures responsibly
- return safe and consistent error responses
- preserve debugging context in logs
- avoid chaotic or duplicated error handling logic

## Suggested Code Components For This Topic

When implementing this topic in code, the examples should include:

- `try/catch` example
- async error handling example
- custom error classes
- validation error example
- business rule error example
- infrastructure error example
- centralized error formatting example
- safe client response vs internal log example
- process-level error example
- bad pattern vs corrected pattern example

## Interview-Style Questions

- What is the difference between operational and programmer errors?
- Why should backend APIs avoid exposing internal error details?
- Why is centralized error handling useful?
- How should async errors be handled differently from sync errors?
- Why are custom error classes useful in large systems?
- What should be logged when a request fails?
- Why is treating every failure as `500` a design problem?
- What makes an error-handling approach maintainable?

## Practice Exercises

1. Create custom error classes for validation and business rule failures.
2. Build a centralized error formatter for API responses.
3. Refactor a handler that swallows errors into one that logs and propagates correctly.
4. Separate an infrastructure error from a validation error in one service flow.
5. Design a safe error response shape for an API.

## Completion Standard

You are ready to move beyond this topic when you can:

- categorize errors clearly
- handle async and sync failures responsibly
- centralize error response logic
- protect internal details from client responses
- preserve the context needed for production diagnosis

## Important Reminder

Error handling is not just defensive coding.

In enterprise systems, it is part of:

- correctness
- observability
- user safety
- operability
- long-term maintainability
