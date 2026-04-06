# Framework Governance Notes

## Platform Sequence

1. Validate service configuration and ownership.
2. Apply mandatory platform plugins based on service profile.
3. Allow service-owned extension hooks only after platform defaults are attached.
4. Review framework upgrades for compatibility impact and migration requirements.
5. Publish framework releases only when release-gate criteria are satisfied.

## Rules

- framework defaults must be explicit and versioned
- service extensions cannot bypass mandatory runtime controls
- public-service behavior must differ from internal-service behavior where policy requires it
- framework releases need changelog, migration guidance, and compatibility evidence
