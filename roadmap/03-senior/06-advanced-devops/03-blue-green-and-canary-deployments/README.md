# Blue-Green And Canary Deployments

## Purpose

Blue-green and canary strategies reduce release risk by controlling how new versions receive production traffic and how quickly teams can detect and contain regressions.

## Enterprise-Level Pointers

- why rollout strategy is part of reliability engineering
- blue-green deployment flow and rollback characteristics
- canary deployment flow and progressive traffic shifting
- blast-radius reduction through controlled exposure
- choosing between blue-green and canary based on system behavior
- traffic routing and health-check integration
- rollout observability requirements
- error budget and SLO awareness during rollout
- automated rollback triggers awareness
- stateful dependency and schema compatibility concerns
- configuration compatibility during multi-version overlap
- release gating and approval workflows
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- fast detection of regressions with limited customer impact
- safe rollback when a release fails under real traffic
- rollout decisions informed by telemetry instead of intuition
- compatibility between old and new versions during transition windows

## Common Production Mistakes

- shifting traffic without adequate observability
- using canary rollout with incompatible schema or API changes
- assuming rollback is safe without testing version overlap
- pushing full traffic too quickly after minimal validation
- treating deployment strategy as a pipeline feature instead of a service design concern

## Maintainability Rules

- define rollout and rollback strategy per service explicitly
- connect rollout steps to metrics, traces, logs, and alerts
- document compatibility expectations for multi-version operation
- automate safe promotion and rollback where possible, but keep operator visibility high
