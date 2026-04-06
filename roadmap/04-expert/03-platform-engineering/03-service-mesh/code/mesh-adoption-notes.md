# Mesh Adoption Notes

## Adoption Sequence

1. Define workload identities and allowed service-to-service calls.
2. Introduce mesh traffic policy for a small subset of services first.
3. Keep application retries and mesh retries from overlapping blindly.
4. Use weighted routing for progressive rollout and rollback.
5. Expand adoption only after policy visibility and incident response are mature.

## Rules

- mesh policy must have clear ownership and review flow
- mTLS identity is useful only when authorization policy is explicit
- mesh-level retries should be bounded and coordinated with application behavior
- rollout and rollback rules must be defined before routing weights change
