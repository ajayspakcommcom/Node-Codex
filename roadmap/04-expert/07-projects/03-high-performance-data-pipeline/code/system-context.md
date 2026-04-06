# System Context

This project represents a high-volume event pipeline that ingests records from producers, batches them for efficient processing, and delivers them to downstream consumers while preserving bounded memory and reviewable recovery behavior.

## Pipeline Stages

- ingestion accepts events under an admission policy
- batch planning groups accepted events by bounded size
- delivery tracks retry and dead-letter outcomes
- replay is a controlled workflow with schema checks
- lag monitoring surfaces downstream health to operators

## Operating Assumptions

- producer throughput can exceed downstream capacity
- ordering matters within a partition, not globally
- replay must be explicit because it can re-trigger side effects
- schema changes must remain compatible for long-lived consumers
