# Mocking For Enterprise Node.js And TypeScript

## Purpose

This topic is about understanding mocking in backend tests.

The goal is not only to replace dependencies. The goal is to understand how enterprise teams use mocks, stubs, fakes, and spies carefully so tests stay focused, deterministic, and honest about the behavior they are supposed to validate.

In enterprise systems, mocking matters because backend teams need to:

- isolate important business logic from unstable dependencies
- simulate failure scenarios that are hard to produce reliably
- verify interactions with infrastructure boundaries
- keep unit tests fast and deterministic
- avoid test suites that pass only because the mocks mirror the implementation

## What This Section Covers

- what mocking is for
- mocks vs stubs vs fakes vs spies
- where mocking belongs
- dependency-boundary design
- infrastructure simulation
- failure-path testing
- over-mocking risks
- contract drift risk
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## Enterprise Context

Mocking is useful when it helps teams isolate risk and control external behavior. It becomes harmful when teams use it as a shortcut that hides real contracts, real invariants, or real integration problems.

Poor mocking practice usually looks like:

- mocking the same code path the test is supposed to validate
- asserting every internal call instead of business outcomes
- creating mocks so detailed that tests break during harmless refactors
- using unrealistic fake behavior that never matches production contracts
- depending on mocking because the design has poor boundaries

The important question is not only "are we mocking?" The real question is:

- are we replacing the right boundaries while preserving meaningful confidence about the behavior under test

## 1. What Mocking Is For

### Enterprise Relevance

Mocking helps isolate a unit from dependencies that are slow, unstable, or outside the scope of the current test.

### Enterprise Rule

- mock dependencies to control boundaries, not to avoid thinking about the real behavior being tested

## 2. Mocks, Stubs, Fakes, And Spies

### Enterprise Relevance

Different test doubles solve different problems. Teams need the right substitute for the right scenario.

### Enterprise Rule

- choose the simplest test double that preserves clarity and supports the scenario honestly

## 3. Where Mocking Belongs

### Enterprise Relevance

Mocking is most useful at infrastructure or external-service boundaries, not in the middle of the business rule itself.

### Enterprise Rule

- mock external boundaries more often than core business logic collaborators

## 4. Dependency-Boundary Design

### Enterprise Relevance

Good mocking depends on code being designed with clean interfaces and explicit responsibilities.

### Enterprise Rule

- design dependencies behind stable interfaces so tests can replace them without distorting the application model

## 5. Infrastructure Simulation

### Enterprise Relevance

Email gateways, queues, payment adapters, and third-party APIs often need simulated behavior in unit and focused integration tests.

### Enterprise Rule

- simulate infrastructure in a way that preserves expected contracts, outputs, and failure behavior

## 6. Failure-Path Testing

### Enterprise Relevance

Many valuable tests require controlled failures that are hard to trigger against real systems on demand.

### Enterprise Rule

- use test doubles to validate failure handling, retries, and fallback behavior intentionally

## 7. Over-Mocking Risks

### Enterprise Relevance

Over-mocking can turn tests into mirrors of the current implementation rather than protection of the intended behavior.

### Enterprise Rule

- if a test breaks whenever harmless refactoring happens, the mocking strategy is probably too coupled to implementation details

## 8. Contract Drift Risk

### Enterprise Relevance

Mocks can become outdated if they stop reflecting the real dependency contract, especially across teams or services.

### Enterprise Rule

- keep mocks close to real contracts and use higher-level tests to catch drift

## 9. Common Production Mistakes

### Common Mistakes

- mocking core logic instead of boundaries
- asserting every internal interaction
- building unrealistic fake responses
- using one giant mock setup for many unrelated tests
- relying on mocks where an integration test would be more honest
- letting test doubles drift away from real dependency behavior

### Enterprise Rule

- use mocking to improve test focus and control without sacrificing meaningful confidence

## 10. Maintainability Rules

- mock boundaries, not the behavior under test
- prefer simple fakes and stubs where possible
- keep test doubles aligned with real contracts
- avoid brittle call-order assertions unless they are truly important
- use failure simulation intentionally
- keep mocking strategy consistent across the codebase

## 11. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- fake repository examples
- payment-gateway mock examples
- retry and fallback failure simulations
- spy-based interaction tests
- over-mocking anti-pattern examples
- contract-drift risk examples
- maintainable Jest mock-structure examples
