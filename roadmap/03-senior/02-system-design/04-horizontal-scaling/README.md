# Horizontal Scaling

## Purpose

This topic is about understanding how systems scale outward across more instances and what architectural assumptions must change when that happens.

At the senior level, horizontal scaling matters because increasing instance count changes coordination, caching behavior, state management, observability needs, and operational failure modes.

## What This Section Covers

- stateless service design
- shared state challenges
- scaling limits and bottlenecks
- coordination and consistency costs
- cache and session considerations
- scaling observability
- common production mistakes
- maintainability rules
- suggested code scope

## Enterprise Context

Horizontal scaling is often presented as an easy answer to growth, but it only works well when the system is designed for it. Senior engineers need to understand which parts scale cleanly, which parts remain bottlenecks, and which dependencies create new coordination cost.

Poor scaling judgment usually looks like:

- adding instances while a shared database remains the real bottleneck
- keeping in-memory session or cache assumptions that break across instances
- ignoring duplicate work and coordination storms
- using autoscaling without reliable health and saturation signals
- confusing more replicas with better architecture

The important question is not only "can we add more nodes?" The real question is:

- which constraints actually improve with more nodes, and which constraints become harder to control

## 1. Stateless Service Design

### Enterprise Relevance

Stateless request handling makes load distribution and replacement safer.

### Enterprise Rule

- keep request-serving layers stateless wherever practical

## 2. Shared State Challenges

### Enterprise Relevance

Sessions, caches, locks, and in-memory coordination break assumptions once more replicas exist.

### Enterprise Rule

- externalize shared state intentionally before scaling instance count

## 3. Scaling Limits And Bottlenecks

### Enterprise Relevance

Some bottlenecks move with scale; others remain fixed in downstream dependencies.

### Enterprise Rule

- identify the real saturation point before adding replicas

## 4. Coordination And Consistency Costs

### Enterprise Relevance

Replication increases concurrency and coordination complexity across nodes.

### Enterprise Rule

- treat distributed coordination as a scaling cost, not an afterthought

## 5. Observability And Autoscaling Signals

### Enterprise Relevance

Safe scaling depends on knowing whether the system is actually improving or only shifting pressure.

### Enterprise Rule

- scale based on trustworthy saturation signals, not guesswork

## 6. Common Production Mistakes

### Common Mistakes

- scaling stateless nodes while ignoring stateful bottlenecks
- keeping local-only session or cache assumptions
- triggering duplicate work across replicas
- relying on autoscaling without capacity signals
- assuming horizontally scaled systems are automatically resilient

### Enterprise Rule

- use horizontal scaling to remove proven limits, not to postpone analysis

## 7. Maintainability Rules

- design APIs and workers with replica safety in mind
- externalize shared state deliberately
- monitor saturation per layer
- document what scales and what does not
- review scaling side effects on consistency and cost

## 8. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- stateless service examples
- shared-state failure examples
- replica-safety examples
- scaling-bottleneck analysis examples
- maintainable autoscaling-signal patterns
