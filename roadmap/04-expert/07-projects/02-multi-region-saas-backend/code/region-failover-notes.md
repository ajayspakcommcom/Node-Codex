# Region Failover Notes

## Operational Rules

- never fail over a tenant into a region that violates residency policy
- prefer a preapproved secondary region over ad hoc operator choice
- treat degraded regions differently from unavailable regions
- require replication-lag review before promoting a passive region

## Common Failure Patterns

- healthy destination region but stale replication state
- global routing updated before application compatibility is confirmed
- emergency failover requested for a tenant with no legal secondary region
- rollback attempted while primary region is still partially degraded

## Review Expectations

- every tenant tier must define primary and approved secondary regions
- control-plane policy must produce auditable routing decisions
- rollout plans must include abort conditions and drain sequencing
