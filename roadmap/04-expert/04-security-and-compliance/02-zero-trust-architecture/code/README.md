# Zero-Trust Architecture Code

This package models zero-trust architecture as explicit identity, authorization, credential lifetime, and access review policy rather than relying on network location or environment assumptions.

## Coverage

- workload identity registry
- least-privilege authorization policy
- short-lived credential policy
- access review and observability decisions
- zero-trust boundary validation
- maintainability-oriented policy ownership

## Notes

- this is an enterprise-style zero-trust package with local validation support
- the goal is to make access decisions reviewable and testable before they become runtime incidents
- files are intentionally structured to separate identity, authorization, credentials, and access review logic
