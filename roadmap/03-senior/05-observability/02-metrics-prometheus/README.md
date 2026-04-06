# Metrics (Prometheus)

## Purpose

Metrics make system behavior measurable over time so teams can detect saturation, latency, error trends, capacity issues, and regressions before or during incidents.

## Enterprise-Level Pointers

- what metrics are and why they complement logs and traces
- counters, gauges, histograms, and summaries awareness
- RED and USE style thinking for service health
- latency, throughput, error rate, and saturation as core service metrics
- application metrics vs infrastructure metrics
- Prometheus scrape model basics
- metric naming conventions and label discipline
- avoiding high-cardinality labels
- histogram bucket strategy awareness
- service-level indicator and service-level objective awareness
- golden signals and business metrics distinction
- dashboard design for operators and responders
- metrics for background jobs, queues, and dependencies
- common production mistakes
- maintainability rules
- interview-style questions
- practice exercises

## What Enterprise Teams Optimize For

- clear service health signals during normal operation and incidents
- metrics that support alerting, dashboards, and capacity planning
- stable labels and metric names across service versions
- low-noise instrumentation that remains affordable and queryable

## Common Production Mistakes

- exposing too many low-value metrics
- using user ids, request ids, or raw URLs as labels
- instrumenting only success paths and missing failures
- treating dashboards as observability instead of measuring the right signals
- adding metrics without clear ownership or usage

## Maintainability Rules

- standardize metric names, labels, and library usage
- keep label sets bounded and review them for cardinality risk
- instrument request paths, background workers, and dependency calls consistently
- tie metrics to concrete operator questions and alert policies
