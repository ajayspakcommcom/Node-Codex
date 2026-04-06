# Schema Compatibility Notes

- New release must be backward compatible with both current and next application versions during rollout overlap.
- Database migrations should be expand-then-contract where possible.
- Rollback must remain possible after the first traffic shift.
- Feature flags are preferred when behavioral changes are large but schema compatibility must remain stable.
