# Deprecation And Versioning Example

- current endpoint: `GET /v1/customers/:customerId`
- planned change: rename `fullName` to `displayName`
- safe approach:
  - keep `fullName` for existing consumers
  - add `displayName` as the new preferred field
  - document deprecation notice and removal timeline
  - remove only after downstream consumers have migrated

