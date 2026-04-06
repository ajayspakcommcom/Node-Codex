# Throughput And SLO Notes

## Example Targets

- steady-state throughput target: `8k rps`
- burst tolerance target: `2.5x steady state for 5 minutes`
- API latency SLO: `p95 under 100ms`, `p99 under 220ms`
- dependency saturation threshold: `80% pool utilization`

## Operational Priorities

- protect dependencies before they collapse
- reject excess work early instead of queueing unbounded work in memory
- keep async offload explicit and observable
- make throughput reviews include cost and degradation behavior

## Validation Rules

- compare rejection behavior and latency under overload, not just throughput
- measure queue depth, cache hit ratio, and dependency saturation
- treat admission-control values as versioned operational configuration
