# Failover And Residency Notes

## Routing Principles

- tenants have a primary region and an allowed failover set
- failover should not violate residency policy
- active-passive is often simpler when write consistency requirements are strict
- operators need explicit signals when traffic is running outside the preferred region

## Operational Rules

- failover policy is control-plane data, not tribal knowledge
- each region should have clear ownership and health signals
- failback should be deliberate and tested, not automatic by accident
