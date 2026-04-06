# Zero-Trust Review Notes

## Review Sequence

1. Register workload and human identities explicitly.
2. Define least-privilege access between identities and resources.
3. Enforce short-lived credentials and revocation expectations.
4. Review access requests against identity and authorization policy.
5. Log access decisions for audit and incident analysis.

## Rules

- no access path should rely only on network location
- every identity needs clear scope and ownership
- long-lived credentials should be treated as explicit exceptions
- authorization policy must remain reviewable and testable as services evolve
