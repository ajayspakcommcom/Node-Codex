# Native Addons (C++)

## Purpose

This topic is about using native addons only for workloads where JavaScript is not enough and the performance or integration gain justifies the build, portability, and maintenance complexity.

## Enterprise-Level Pointers

- when native addons are justified
- Node-API and ABI-stability awareness
- boundary design between JS and native code
- memory ownership and lifecycle awareness
- error propagation across language boundaries
- portability and build pipeline complexity
- packaging and release strategy
- observability for native-backed paths
- security and supply-chain implications
- rollback and fallback strategy
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Expert Teams Optimize For

- measurable performance or capability gains
- safe boundaries between runtime-managed and native-managed resources
- reproducible builds across environments
- fallback paths when native components fail or lag behind platform upgrades

## Common Production Mistakes

- introducing native code for benchmark bragging rather than real business value
- leaking memory or creating undefined lifecycle boundaries
- coupling addon builds too tightly to one environment
- treating native ownership as a one-time implementation instead of ongoing platform work

## Maintainability Rules

- justify native code with evidence and expected long-term ownership
- keep the JS-facing surface small and stable
- monitor native-backed paths separately from pure JS paths
- design for upgrade, rollback, and platform portability

## Interview Questions

- What kinds of Node problems are strong candidates for native addons?
- Why is ABI stability important for addon maintenance?
- How would you reduce operational risk when introducing native code into a production service?

## Practice Exercises

- Define a decision checklist for when to build a native addon.
- Design a JS-facing contract for a performance-critical native module.
- Write a release and rollback plan for shipping a native dependency in CI/CD.
