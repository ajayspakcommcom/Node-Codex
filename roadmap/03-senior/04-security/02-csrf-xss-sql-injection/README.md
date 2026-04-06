# CSRF, XSS, SQL Injection

## Purpose

These three vulnerability classes appear at different boundaries, but all of them exploit unsafe trust assumptions between user input, browser behavior, rendered output, and data-access layers.

## Enterprise-Level Pointers

- CSRF threat model and when it applies
- browser cookie behavior and state-changing request risks
- CSRF defenses: same-site cookies, anti-CSRF tokens, origin checks
- where CSRF matters less in token-only APIs and where it still matters
- reflected, stored, and DOM-based XSS awareness
- output encoding and context-aware rendering safety
- dangerous HTML rendering and rich-text handling risks
- content security policy awareness
- input validation vs output encoding distinction
- SQL injection through concatenated queries and unsafe filtering
- prepared statements, parameterized queries, and ORM misuse awareness
- injection beyond SQL: NoSQL, shell, template, and dynamic query building
- trust boundary design for request data
- sanitization pitfalls and false sense of safety
- logging and monitoring suspicious payload behavior
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- strong request-boundary safety
- safe rendering and output behavior across UI and admin tools
- parameterized and reviewable data-access patterns
- reusable defenses instead of endpoint-by-endpoint improvisation

## Common Production Mistakes

- assuming validation alone prevents XSS
- building dynamic SQL or query fragments from user input
- trusting internal admin interfaces more than public-facing interfaces
- disabling browser protections without understanding CSRF impact

## Maintainability Rules

- keep boundary validation and query construction standardized
- never concatenate untrusted input into SQL or command strings
- separate output encoding responsibilities from raw storage concerns
- document where browser-based session behavior creates CSRF exposure
