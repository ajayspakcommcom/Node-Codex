# Secrets Management

## Purpose

Secrets management is the discipline of storing, delivering, rotating, and revoking credentials safely across local development, CI, staging, production, and operational workflows.

## Enterprise-Level Pointers

- what counts as a secret in backend systems
- why environment variables alone are not a complete secrets strategy
- secret sprawl across code, CI, containers, logs, and support tooling
- centralized secrets managers and vault-based patterns
- short-lived vs long-lived credentials
- least-privilege access to secrets
- secret access by workload identity instead of static credentials where possible
- local development secret handling
- CI and deployment secret handling
- secret rotation workflows and blast-radius reduction
- secret revocation and incident response
- preventing secret leakage into logs, metrics, traces, and exceptions
- secret versioning and rollout coordination
- auditing access to secrets
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- minimizing exposure time and blast radius of sensitive credentials
- strong access controls around secret retrieval and use
- auditable, repeatable rotation workflows
- consistent handling across environments and teams

## Common Production Mistakes

- committing secrets to repos or build artifacts
- copying production secrets into local machines or shared chat tools
- leaving rotated secrets active longer than necessary
- hardcoding secrets into containers, images, or startup scripts

## Maintainability Rules

- keep secret retrieval centralized and environment-aware
- prefer short-lived credentials and workload identity where possible
- make rotation and revocation operationally documented and testable
- treat secret access logs as part of normal security observability
