# Platform Adoption Notes

## Paved-Road Sequence

1. Choose the closest supported service template.
2. Apply mandatory controls for telemetry, deployment safety, and secret handling.
3. Review requested exceptions against explicit ownership and expiration.
4. Provision the service from the platform template.
5. Track adoption and upgrade drift over time.

## Rules

- platform defaults must be easier than custom hand-built setups
- exceptions must be explicit, reviewed, and time-bounded
- templates need version ownership and upgrade paths
- platform teams own the paved road, but service teams still own service behavior
