# Token Rotation Code

This code set demonstrates enterprise-style token lifecycle patterns for access tokens, refresh tokens, rotation, and revocation.

## Coverage

- access token vs refresh token roles
- short-lived access token strategy
- refresh token rotation
- replay detection
- revocation workflows
- session and device scoping
- sliding vs fixed session windows
- signing key rotation awareness
- token introspection vs self-contained token tradeoffs
- maintainability patterns

## Notes

- examples focus on lifecycle design and operational behavior rather than JWT library wiring
- the goal is to model compromise-aware token handling
- these examples use in-memory stores to keep the focus on architecture
