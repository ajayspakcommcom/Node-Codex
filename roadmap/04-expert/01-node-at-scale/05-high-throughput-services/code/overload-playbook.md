# Overload Playbook

## When Traffic Spikes

- enable request shedding before dependency pools saturate
- prioritize core read/write paths over optional enrichment
- reduce background concurrency if it competes with user traffic
- preserve observability on rejected work so incidents stay debuggable

## Review Questions

- is overload causing uncontrolled memory growth
- are dependencies protected by concurrency limits
- are cache and queue policies bounded
- can operators tell whether the service is shedding, backing up, or saturating
