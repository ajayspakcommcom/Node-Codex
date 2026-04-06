# Memory Investigation Checklist

## Before Changing Runtime Flags

- confirm whether the issue is leak, cache growth, or workload-driven allocation pressure
- compare heap growth over time, not one isolated sample
- inspect object retention patterns before tuning the heap
- correlate memory growth with latency, GC pauses, and traffic shape
- verify whether buffers or large payloads are being retained longer than needed

## Review Questions

- does the service hold long-lived references unnecessarily
- are caches bounded and observable
- are buffers copied or retained across async boundaries without need
- is the workload allocation-heavy on a known hot path
- would fixing code-level retention remove the need for runtime tuning
