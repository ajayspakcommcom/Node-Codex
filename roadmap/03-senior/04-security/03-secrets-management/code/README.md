# Secrets Management Code

This code set demonstrates enterprise-style patterns for handling secrets safely across service boundaries and environments.

## Coverage

- identifying secrets vs normal configuration
- centralized secret retrieval
- environment-aware secret loading
- least-privilege secret access
- rotation and revocation workflows
- short-lived credential awareness
- secret versioning
- log and trace redaction
- workload identity awareness
- maintainability patterns

## Notes

- examples focus on architecture and operational safety rather than real vault SDK integration
- the goal is to show where secret-handling responsibility belongs in service code
- these examples intentionally avoid printing or embedding real secret values
