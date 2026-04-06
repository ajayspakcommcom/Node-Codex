# Memory And GC Tuning

## Purpose

This topic is about managing memory behavior and garbage collection in long-lived Node services where latency, throughput, and heap pressure interact under sustained load.

## Enterprise-Level Pointers

- heap sizing tradeoffs
- allocation pressure and GC pause awareness
- short-lived vs long-lived object patterns
- retained-object investigation
- memory profiles under realistic traffic
- GC tuning only after workload analysis
- runtime flags awareness
- leak vs growth vs caching distinction
- latency impact of GC under load
- rollout safety for runtime tuning changes
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Expert Teams Optimize For

- predictable memory behavior over long runtimes
- acceptable GC impact on p95 and p99 latency
- operational confidence before changing runtime settings
- fixing allocation and retention causes instead of masking them with flags

## Common Production Mistakes

- increasing heap size to hide leaks or poor allocation behavior
- changing GC settings without before-and-after evidence
- tuning on synthetic workloads that do not match production traffic
- ignoring cache, buffer, or retention design while focusing only on runtime flags

## Maintainability Rules

- investigate memory shape before tuning GC
- treat runtime flags as versioned operational decisions
- validate tuning changes with latency and memory evidence
- document why a non-default runtime setting exists

## Interview Questions

- When should you look at heap tuning versus fixing application allocation patterns?
- How can GC behavior affect tail latency in a high-traffic service?
- What evidence would you require before changing Node runtime memory settings?

## Practice Exercises

- Create a checklist for diagnosing rising heap usage in a long-lived service.
- Write a before-and-after validation plan for a GC tuning change.
- Compare leak, legitimate cache growth, and workload-driven allocation pressure.
