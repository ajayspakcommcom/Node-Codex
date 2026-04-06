# Governance Rollout Notes

## Governance Sequence

1. Register contract ownership and lifecycle state.
2. Validate style requirements for auth, pagination, and error semantics.
3. Classify the proposed change as additive, risky, or breaking.
4. Require deprecation notice and rollout coordination for breaking-risk changes.
5. Block release until ownership approval and compatibility checks pass.

## Rules

- every externally consumed contract needs an explicit owner
- governance policy should be automated before it becomes committee work
- deprecation timelines must be visible to consumers before removal
- breaking-risk changes need rollout plans, not just schema diffs
