# Capacity And SLO Notes

## Example Targets

- steady-state throughput target: `12k rps`
- traffic-spike tolerance target: `3x steady-state for 10 minutes`
- API latency SLO: `p95 under 120ms`, `p99 under 250ms`
- error budget focus: `5xx under 0.3%`

## Control Points

- cache hit ratio is a first-class performance signal
- rate limiting protects the API from abuse and accidental client bursts
- concurrency guards protect internal dependencies from saturation
- non-user-critical heavy work is moved to async indexing paths

## Failure Strategy

- prefer `429` and controlled shedding over dependency collapse
- serve cached data where consistency requirements allow it
- degrade optional features before degrading core reads
- keep the public API stateless so horizontal scaling remains simple
