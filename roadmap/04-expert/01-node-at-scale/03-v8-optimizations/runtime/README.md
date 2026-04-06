# Runtime Validation

This runtime layer exists so the topic has executable benchmark and profiling scaffolding, not only conceptual examples.

## Included

- shape-stability benchmark
- serialization benchmark
- allocation-pressure benchmark
- Node built-in tests for shape-stable vs shape-changing paths
- `--cpu-prof` profiling entrypoints
- CI example for repeatable validation

## Commands

```bash
npm test
npm run bench:shapes
npm run bench:serialization
npm run bench:allocation
npm run profile:shapes
```

## Intent

- keep benchmarks small but reproducible
- measure with the same fixture shape on every run
- make optimization review artifacts runnable in CI
