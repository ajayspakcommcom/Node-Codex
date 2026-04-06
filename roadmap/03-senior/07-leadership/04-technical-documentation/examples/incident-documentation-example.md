# Incident Documentation Example

- incident id: `INC-204`
- summary: checkout latency increased due to synchronous invoice generation path
- impact: 18% of checkouts exceeded latency SLO
- contributing factors:
  - high traffic burst
  - expensive synchronous report generation
  - insufficient request-path observability before rollout
- corrective actions:
  - move invoice generation to async worker
  - add queue depth and worker saturation metrics
  - update checkout service runbook

