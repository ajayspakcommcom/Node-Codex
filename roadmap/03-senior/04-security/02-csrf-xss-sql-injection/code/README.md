# CSRF, XSS, SQL Injection Code

This code set demonstrates enterprise-style patterns for defending common browser-boundary and data-boundary injection risks.

## Coverage

- CSRF threat boundaries
- anti-CSRF token validation
- origin and same-site awareness
- reflected and stored XSS awareness
- context-aware output encoding
- rich-text rendering safety boundaries
- parameterized SQL queries
- unsafe dynamic query anti-patterns
- injection beyond SQL awareness
- maintainability patterns

## Notes

- examples focus on safe boundary design rather than exploit demonstrations
- the goal is to show how secure defaults are enforced in service code
- some files are policy-oriented because the most important lesson is architectural discipline
