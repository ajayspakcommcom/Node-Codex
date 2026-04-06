# Kubernetes Fundamentals

## Purpose

Kubernetes fundamentals matter because production services do not only need to run; they need to be scheduled, updated, scaled, isolated, and recovered safely under real traffic and failure conditions.

## Enterprise-Level Pointers

- what Kubernetes solves in modern platform operations
- pods, deployments, replica sets, services, config maps, and secrets
- desired state and reconciliation model
- scheduling and node placement awareness
- readiness probes, liveness probes, and startup probes
- rolling updates and rollout history
- resource requests and limits
- autoscaling awareness
- service discovery and internal networking basics
- ingress and traffic entry boundaries
- environment-specific configuration handling
- secret handling in Kubernetes environments
- namespace and workload isolation awareness
- observability and health integration with workloads
- failure recovery and self-healing expectations
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- predictable workload behavior under scaling and failure
- safe rollouts and recoverable runtime operations
- clear workload boundaries and environment consistency
- explicit health and resource policies instead of runtime guesswork

## Common Production Mistakes

- using default probe and resource settings without workload-specific tuning
- storing too much environment logic directly inside manifests
- treating pods as stable machines instead of disposable runtime units
- ignoring scheduling and resource pressure until incidents happen
- mixing secrets, config, and runtime assumptions carelessly

## Maintainability Rules

- keep workload manifests explicit, reviewable, and environment-aware
- define probes, resources, and rollout settings intentionally
- document service runtime expectations and failure behavior
- standardize Kubernetes patterns across teams where possible
