# Runbook: Payment Gateway Timeout Spike

## Trigger

- alert: `payment_gateway_timeout_rate_high`

## Immediate Actions

- check payment service dashboard for dependency latency and error rate
- inspect trace samples for timeout concentration
- verify whether retry or circuit-breaker behavior changed recently
- confirm whether issue is isolated to one region or provider endpoint

## Rollback Or Mitigation

- reduce rollout traffic if a deployment is in progress
- enable degraded payment fallback if supported
- contact provider if outage is external and confirmed

## Escalation

- payments on-call
- platform on-call if broader network or infrastructure issue is suspected

