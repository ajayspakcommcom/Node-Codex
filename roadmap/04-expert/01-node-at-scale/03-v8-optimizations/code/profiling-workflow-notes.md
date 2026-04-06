# Profiling Workflow Notes

## Profiling Order

- confirm the user-facing symptom first such as `p99 latency`, `CPU saturation`, or `request timeout spikes`
- identify the hot path before rewriting code
- capture production-like traffic shape in a staging or replay environment
- compare baseline and candidate implementations with the same workload

## Runtime Review Questions

- is the hot path allocation-heavy
- are object shapes stable across requests
- is serialization or parsing dominating the path
- is the path CPU-bound or blocked by a dependency
- will a more complex implementation remain understandable for future engineers

## Operational Rule

- V8-sensitive changes should be treated as targeted interventions, not general coding style rules
