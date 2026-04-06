# Service Mesh Code

This package models service mesh adoption as explicit control-plane policy, workload identity, traffic shifting, and resilience ownership rather than vendor-specific configuration alone.

## Coverage

- service identity and authorization policy
- traffic routing and weighted rollout rules
- mesh retry and timeout boundaries
- progressive rollout planning
- mesh observability and maintainability boundaries
- policy-first service communication review

## Notes

- this is an enterprise-style mesh policy package with local validation support
- the goal is to make service-to-service policy reviewable before a real mesh is introduced
- files are intentionally structured to separate traffic policy, identity policy, and rollout decisions
