# Load Balancing

## Purpose

This topic is about understanding how traffic is distributed across backend capacity and why that distribution affects reliability as much as throughput.

At the senior level, load balancing matters because poor traffic distribution creates uneven hotspots, fragile failover, and misleading capacity assumptions even when total infrastructure looks sufficient.

## What This Section Covers

- load-balancing goals
- balancing algorithms
- health checks and failover
- sticky sessions and state concerns
- regional and zonal traffic distribution
- balancing observability
- common production mistakes
- maintainability rules
- suggested code scope

## Enterprise Context

Senior engineers should view load balancing as a resilience and availability tool, not only a scaling mechanism. A balancer decides where traffic lands, how failures are isolated, and whether unhealthy capacity keeps receiving requests.

Poor load-balancing understanding usually looks like:

- assuming round robin solves all imbalance
- ignoring health-check quality
- keeping session state on instances without a clear affinity strategy
- confusing more instances with healthy distribution
- forgetting that failover behavior changes tail latency and incident severity

The important question is not only "how do we spread requests?" The real question is:

- how do we route traffic so the system stays reliable when nodes, zones, or dependencies behave badly

## 1. Balancing Goals

### Enterprise Relevance

Load balancing supports availability, fairness, and capacity utilization, not only raw scale.

### Enterprise Rule

- define what the balancer is optimizing before choosing its behavior

## 2. Balancing Algorithms

### Enterprise Relevance

Different algorithms behave differently under uneven request cost and dynamic instance health.

### Enterprise Rule

- choose balancing strategy based on workload shape, not defaults alone

## 3. Health Checks And Failover

### Enterprise Relevance

Bad health checks allow unhealthy nodes to continue serving or healthy nodes to be removed incorrectly.

### Enterprise Rule

- treat health-check design as part of reliability engineering

## 4. Sticky Sessions And State

### Enterprise Relevance

Session affinity can simplify stateful workloads but reduces balancing flexibility and resilience.

### Enterprise Rule

- keep request handling stateless where possible and use affinity only intentionally

## 5. Traffic Distribution Across Failure Domains

### Enterprise Relevance

Load balancing strategy affects zone-level resilience and failure blast radius.

### Enterprise Rule

- align traffic distribution with infrastructure failure boundaries

## 6. Common Production Mistakes

### Common Mistakes

- depending on naive round robin for uneven workloads
- using shallow health checks
- coupling state to specific instances
- ignoring imbalance during partial outages
- treating balancing as invisible infrastructure magic

### Enterprise Rule

- make traffic distribution behavior explicit and observable

## 7. Maintainability Rules

- document balancing assumptions
- measure per-instance load, not only total traffic
- keep health checks meaningful and cheap
- avoid unnecessary session affinity
- review failover behavior before incidents force it

## 8. Suggested Code Scope

Inside the `code` folder, this topic can later include:

- balancing algorithm examples
- health-check and failover examples
- sticky-session tradeoff examples
- zonal distribution examples
- maintainable traffic-distribution analysis patterns
