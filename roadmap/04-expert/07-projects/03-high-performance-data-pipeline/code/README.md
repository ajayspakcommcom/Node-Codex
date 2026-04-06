# High-Performance Data Pipeline Code

This package models a production-style data pipeline with explicit throughput boundaries, batching policy, backpressure control, schema governance, replay handling, and lag review.

## What Is Included

- ingestion policy with bounded queue admission
- batch planning with memory-safe limits
- retry, dead-letter, and replay decision logic
- schema compatibility review for event evolution
- consumer lag and pipeline health review
- runtime tests and a sample pipeline review scenario

## Why This Is Enterprise Level

- correctness and recovery are modeled alongside throughput
- backpressure is explicit instead of hidden in buffers
- schema evolution and replay are treated as governance concerns
- lag and dead-letter handling are reviewable operational controls
- the package is locally typechecked, tested, and runnable
