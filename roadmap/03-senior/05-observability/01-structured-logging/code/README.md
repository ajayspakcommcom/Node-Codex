# Structured Logging Code

This code set demonstrates enterprise-style structured logging patterns for production Node.js services.

## Coverage

- shared JSON log schema
- request id and trace context correlation
- log levels and event naming
- request, business, and infrastructure boundary logs
- async workflow logging
- sensitive data redaction
- audit vs operational log separation
- metadata enrichment
- sampling awareness
- maintainability patterns

## Notes

- examples use a small shared logger abstraction to model consistent log shape
- the goal is to show operationally useful logging, not generic debug output
- logs are intentionally structured as objects so downstream systems can query them reliably
