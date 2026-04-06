# Threat Review Notes

## Review Sequence

1. Identify critical assets and exposed entry points.
2. Mark trust boundaries between users, services, and data stores.
3. Write realistic abuse scenarios against those boundaries.
4. Score scenarios by impact and likelihood.
5. Assign mitigations, residual risk, and owning teams.

## Rules

- threat models must reference real system boundaries, not generic category lists
- every high-risk scenario needs a mitigation decision or explicit residual-risk owner
- trust-boundary changes should trigger threat-model review
- keep the model lightweight enough to update during normal architecture work
