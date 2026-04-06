# Kubernetes Fundamentals Code

This code set demonstrates enterprise-style Kubernetes workload patterns for a production-facing Node.js API.

## Coverage

- namespace and workload isolation
- config maps and secret boundaries
- deployments with rolling-update strategy
- readiness, liveness, and startup probes
- resource requests and limits
- service exposure and ingress boundaries
- autoscaling
- pod disruption budgets
- network policy
- node placement and topology spread

## Notes

- manifests are written as reviewable examples rather than cluster-specific output
- values are illustrative and should be tuned for the actual workload
- secrets are intentionally represented as placeholders, not real values
