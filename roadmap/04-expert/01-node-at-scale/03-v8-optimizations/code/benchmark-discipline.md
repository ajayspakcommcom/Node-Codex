# Benchmark Discipline

## Rules

- benchmark the same workload with warm-up and steady-state phases
- compare throughput and tail latency, not only average execution time
- separate micro-benchmarks from request-path benchmarks
- record payload size, object shape, and allocation pattern assumptions
- never merge a runtime-sensitive change without documenting the measured reason

## Anti-Patterns

- benchmarking on unrealistic tiny payloads
- comparing optimized code against a different workload shape
- ignoring memory pressure while celebrating CPU improvements
- applying one benchmark result as a universal coding rule
